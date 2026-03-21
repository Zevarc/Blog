import type { Post, PostRecord } from './types'
import { getLink } from '$lib/i18n';

function handleContent(modules: Record<string, PostRecord>, lang: string | undefined = undefined, basePath: string): Post[] {
  const posts: Post[] = []
  for (const path in modules) {
    const post = modules[path]
    const fileName = path?.split('/').pop()?.replace('.md', '') ?? "";
    const [slug, fileLang] = fileName.split('.')
    const metadata = post.metadata
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      "headline": metadata.title,
      "datePublished": metadata.date,
      "dateModified": metadata.updated,
      "author": {
        "@type": "Person",
        "name": "Zevarc"
      }

    }
    const content = { component: post.default, ...metadata, slug, lng: fileLang, url: `${basePath}/${slug}`, jsonLd }
    !content.draft && (!lang || fileLang === lang) && posts.push(content)
  }
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  return posts
}

function loadPosts(lang: string | undefined = undefined): Post[] {
  return handleContent(import.meta.glob('/src/content/posts/*.md', { eager: true }), lang, getLink('posts', lang));
}

function loadNotes(lang: string | undefined = undefined): Post[] {
  return handleContent(import.meta.glob('/src/content/notes/*.md', { eager: true }), lang, getLink('posts/notes', lang));
}

export { loadPosts, loadNotes };