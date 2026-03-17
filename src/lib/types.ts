export interface PostMeta {
    title: string
	description: string
	date: string
	tags: string[]
	draft: boolean
}

export interface Post extends PostMeta {
    slug: string|undefined
    component: any
}

export interface PostRecord {
    metadata: PostMeta
    default: any
}