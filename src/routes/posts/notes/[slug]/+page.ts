import { loadNotes } from "$lib/posts";

export function entries() {
    const notes = loadNotes()
    return notes.map(note => ({ slug: note.slug }))
}

export function load({params}) {
    const notes = loadNotes()
    return { post: notes.find(note => note.slug === params.slug) }
}