import { loadPosts } from "$lib/posts";

export function load({params}) {
    const posts = loadPosts()
    return { post: posts.find(post => post.slug === params.slug) }
}