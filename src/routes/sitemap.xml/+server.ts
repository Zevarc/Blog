import { loadNotes, loadPosts } from '$lib/posts'

export const prerender = true

async function formatContent(lang) {
    const posts = await loadPosts(lang)
    const notes = await loadNotes(lang)
    return posts.map(post => `posts/${post.slug}`).concat(notes.map(note => `posts/notes/${note.slug}`))
}
async function gen(target, alternate) {
    const siteUrl = 'https://zevarc.com';

    const fixUrls = ['', 'posts', 'projects']
    const contents = await formatContent(target)
    const alternateContents = await formatContent(alternate)

    const urls = fixUrls.concat(contents)
    const alternateUrls = fixUrls.concat(alternateContents)
    const sitemap = urls.map(url => {
        const origin = 'en' == target ? `${siteUrl}/${url}` : `${siteUrl}/${target}/${url}`
        const alternateUrl = 'en' == alternate ? `${siteUrl}/${url}` : `${siteUrl}/${alternate}/${url}`
        return `
                <url>
                <loc>${origin}</loc>
                <xhtml:link
                        rel="alternate"
                        hreflang="${target}"
                        href="${origin}"/>
                <xhtml:link
                        rel="alternate"
                        hreflang="${alternate}"
                        href="${alternateUrl}"/>
                    }
                </url>`
    }).join('')
    return sitemap
}
export async function GET(p) {
    const urls = await gen('en', 'zh')

    return new Response(
        `
		<?xml version="1.0" encoding="UTF-8" ?>
		<urlset
			xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
			xmlns:xhtml="https://www.w3.org/1999/xhtml"
			xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
			xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
			xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
			xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
		>
			${urls}
		</urlset>`.trim(),
        {
            headers: {
                'Content-Type': 'application/xml'
            }
        }
    );
}