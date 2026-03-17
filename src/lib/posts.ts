import type { Post, PostMeta, PostRecord } from './types'
const posts: Post[] = []
const tags = new Map<string, PostMeta[]>()

const modules: Record<string, PostRecord> = import.meta.glob('/src/content/posts/*.md', { eager: true })
for (const path in modules) {
  const post = modules[path]
  const slug = path?.split('/').pop()?.replace('.md', '');
  const metadata = post.metadata
  const content = { component: post.default, ...metadata, slug }
  !content.draft && posts.push(content)
}
posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

for (const post of posts) {
  for (const tag of post.tags || []) {
    if (!tags.has(tag)) tags.set(tag, [])
    tags.get(tag)?.push(post)
  }
}

export { posts, tags };