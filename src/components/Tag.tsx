import React from "react"
import classNames from "../utils"

enum ENUM_TAG {
    DEVICE = "DEVICE",
    ACCESSORIES = "ACCESSORIES",
}

const TagInfo: Record<ENUM_TAG, {
    bgc: string,
    textColor: string
}> = {
    [ENUM_TAG.ACCESSORIES]: {
        bgc: "#16a34a",
        textColor: "#fff"
    },
    [ENUM_TAG.DEVICE]: {
        bgc: "#0284c7",
        textColor: "#fff"
    }
}

const positionTag: Record<TYPE_POSITION, string> = {
    'center': 'mx-auto',
    'left': 'mr-auto',
    'right': 'ml-auto'
}

type TYPE_POSITION = 'left' | 'right' | 'center'


interface Props {
    tag: ENUM_TAG,
    name: string,
    classes?: string,
    position?: TYPE_POSITION
}

const Tag = ({tag, name, classes = '', position = 'center'}: Props ) => {
    return (
        <div className={classNames(`max-w-max px-2 rounded-md`, classes, positionTag[position])} style={{backgroundColor: TagInfo[tag.toUpperCase() as ENUM_TAG]?.bgc || ''}}>
            <span style={{color: TagInfo[tag.toUpperCase() as ENUM_TAG]?.textColor, fontSize: "14px"}}>{name}</span>
        </div>
    )
}

export default Tag