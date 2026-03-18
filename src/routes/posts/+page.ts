import { loadPosts,loadNotes } from "$lib/posts";

export function load() {
    const posts = loadPosts('en')
    const notes = loadNotes('en')
    return { posts, notes }
}