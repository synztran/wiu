import React, { useEffect, useState } from 'react'
import { IoSunny, IoMoon } from 'react-icons/io5/index.js'

enum THEMES {
    LIGHT = 'light',
    DARK = 'dark'
}
interface ThemeOpt{
    name: string,
    icon: JSX.Element
}


const ThemeList: Record<THEMES, ThemeOpt> = {
    [THEMES.DARK]: {
        name: 'dark',
        icon: <IoMoon/>
    },
    [THEMES.LIGHT]: {
        name: 'light',
        icon: <IoSunny />
    }
}
const themes = [THEMES.LIGHT, THEMES.DARK]

export default function ThemeBtn(){
    const [isMounted, setMounted] = useState<boolean>(false)
    const [theme, setTheme] = useState(()=>{
        if(import.meta.env.SSR){
            return undefined
        }
        if(typeof localStorage !== 'undefined' && localStorage.getItem('theme')){
            return localStorage.getItem('theme')
        }
        if(window.matchMedia('(prefers-color-schema: dark)').matches){
            return 'dark'
        }
        return 'light'
    }) 
    
    const toggleTheme = () => {
        const t = theme === 'light' ? 'dark' : 'light'
        localStorage.setItem('theme', t)
        setTheme(t)
    }

    useEffect(()=>{
        const root = document.documentElement; 
        if(theme === 'light'){
            root.classList.remove('dark')
        }else{
            root.classList.add('dark')
        }
    },[theme])

    useEffect(()=>{
        setMounted(true);
    },[])

    return isMounted ? (
        <div className='inline-flex items-center p-[1px] rounded-3xl bg-orange-300 dark:bg-zinc-600'>{
            themes.map((t) => {
                const checked = t === theme
                return <button key={t} className={`${checked ? 'bg-white' : ''} cursor-pointer rounded-3xl p-2`} onClick={toggleTheme} aria-label="Toggle theme">{ThemeList[t].icon}</button>
            })
        }</div>
    ) : <div></div>
} 