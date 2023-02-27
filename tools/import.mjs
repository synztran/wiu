import './env.mjs'
import { LiveExporter, toKebabCase } from '@inkdropapp/live-export'

const {INKDROP_USERNAME, INKDROP_PASSWORD, INKDROP_PORT, INKDROP_BOOKID} = process.env

const liveExport = new LiveExporter({
    username: INKDROP_USERNAME,
    password: INKDROP_PASSWORD,
    port: Number(INKDROP_PORT)
})
console.log(liveExport)

const basePath = `./src/pages/posts`
const publicPath = `./public/posts`

await liveExport.start({
    live: true,
    bookId: INKDROP_BOOKID,
    preProcessNote: ({note, frontmatter, tags}) => {
        frontmatter.layout = '../../layouts/BlogPost.astro';
        frontmatter.title = note.title;
        frontmatter.createdAt = note.createdAt;
        frontmatter.updatedAt = note.updatedAt;
        frontmatter.tags = tags.map(t => t.name)
        frontmatter.heroImage = '/astrojs.jpg'
        if(!frontmatter.slug) frontmatter.slug = toKebabCase(note.title)
    },
    pathForNote: ({frontmatter}) => {
        if(frontmatter.public){
            return `${basePath}/${frontmatter.slug}.md`
        }else return false
    },
    pathForFile: ({mdastNode, frontmatter, extension}) => {
        if(mdastNode.alt){
            const fn =`${frontmatter.slug}_${toKebabCase(mdastNode.alt)}${extension}}`
            const res = {
                filePath: `${publicPath}/${fn}`,
                url: `/posts/${fn}`
            }
            if(mdastNode.alt === 'thumbnail'){
                frontmatter.heroImage = res.url
            }
        }else return false 
    },
    postProcessNote: ({md}) => {
        //Remove the thumbnail from the note body
        const md2 = md.replace(/\!\[thumbnail\]\(.*\)\n/);
        return md2 
    }
})