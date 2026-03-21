export interface PostMeta {
    title: string
	description: string
    cover: string|undefined
	date: string
    updated: string
	tags: string[]
	draft: boolean
}

export interface Post extends PostMeta {
    slug: string
    lng: string
    component: any
}

export interface PostRecord {
    metadata: PostMeta
    default: any
}