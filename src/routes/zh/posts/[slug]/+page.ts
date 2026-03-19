import { loadPosts } from "$lib/posts";

export function entries() {
    const posts = loadPosts('zh')
    return posts.map(post => ({ slug: post.slug }))
}

export function load({params}) {
    const posts = loadPosts('zh')
    return { post: posts.find(post => post.slug === params.slug) }
}