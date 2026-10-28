export interface ContentItem{
    id:number
    title:string
    description:string
}


export interface PreviewSkillItem extends ContentItem {
    tags?:string[]
    fileCount?: number
}