import { loadPosts,loadNotes } from "$lib/posts";

export function load() {
    const posts = loadPosts('zh')
    const notes = loadNotes('zh')
    return { posts, notes }
}