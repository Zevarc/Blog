<script>
    const { post } = $props();
    const json = JSON.stringify(post.jsonLd);
    const url=`${post.isNotes?"posts/notes":"posts"}/${post.slug}`
</script>

<svelte:head>
    <title>{post.title} - zevarc</title>
    <meta name="description" content={post.description} />
    <link rel="canonical" href={`https://zevarc.com/${post.url}`} />
    <link rel="alternate" hreflang="en" href={`https://zevarc.com/${url}`} />
    <link rel="alternate" hreflang="zh" href={`https://zevarc.com/zh/${url}`}/>
    <link rel="alternate" hreflang="x-default" href={`https://zevarc.com/${url}`}/>
    {@html `<script type="application/ld+json">${json}</script>`}
</svelte:head>

<article>
    <h1>{post.title}</h1>
    <main>
        {@render post.component()}
    </main>
</article>

<style>
    article {
        max-width: 72ch;
        margin: 0 auto;
        padding: clamp(16px, 4vw, 24px) clamp(16px, 4vw, 24px);
        line-height: 1.7;
        -webkit-font-smoothing: antialiased;
        text-rendering: optimizeLegibility;
    }

    :global(article > * + *) {
        margin-top: 1.2em;
    }
    :global(img) {
        display: block;
        max-width: 100%;
        height: auto;
        margin: 2.5rem auto;
        border-radius: 6px;
        border: 1px solid var(--border-color);
        box-shadow: 0 4px 12px var(--color-shadow);
        object-fit: contain;
    }

    :global(img + em) {
        display: block;
        text-align: center;
        font-size: 0.9rem;
        color: var(--text-muted);
        margin-top: -1.5rem;
        margin-bottom: 2rem;
    }

    :global(ul, ol) {
        padding-left: 1.4em;
        margin: 1em 0;
    }

    :global(li) {
        margin: 0.4em 0;
    }

    :global(li::marker) {
        color: var(--color-outline);
    }
</style>
