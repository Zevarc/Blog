<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import LanguageSwitcher from '$lib/components/LanguageSwitcher.svelte';
  import { getDictionary } from '$lib/i18n/index.js';
  
  let currentLang = $state('zh');
  let t = $derived(getDictionary(currentLang));
  
  let visible = $state(false);
  
  onMount(() => {
    setTimeout(() => {
      visible = true;
    }, 100);
  });
  
  function handleNext(event) {
    event.preventDefault();
    goto('/zh/projects');
  }
</script>

<svelte:head>
  <title>{t.seo.blog.title}</title>
  <meta name="description" content={t.seo.blog.description} />
  <link rel="alternate" hreflang="en" href="https://zevarc.com/blog" />
  <link rel="alternate" hreflang="zh-Hans" href="https://zevarc.com/zh/blog" />
</svelte:head>

<LanguageSwitcher />

<div class="page">
  <main class="content" class:visible>
    <div class="section-header">
      <span class="station-label">{t.blog.station}</span>
      <h1 class="title">{t.blog.title}</h1>
      <p class="subtitle">{t.blog.subtitle}</p>
    </div>
    
    <div class="posts-container">
      {#each t.blog.posts as post, i}
        <article class="post-card" style="animation-delay: {0.1 + i * 0.1}s">
          <span class="post-date">{post.date}</span>
          <h2 class="post-title">{post.title}</h2>
          <p class="post-excerpt">{post.excerpt}</p>
          <div class="post-tags">
            {#each post.tags as tag}
              <span class="tag">{tag}</span>
            {/each}
          </div>
        </article>
      {/each}
    </div>
    
    <div class="navigation-section">
      <a href="/zh/projects" class="nav-link" onclick={handleNext}>
        {t.blog.next}
        <svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </a>
    </div>
  </main>
  
  <footer class="footer">
    <p>Created by MiniMax Agent</p>
  </footer>
</div>

<style>
  .page {
    position: relative;
    width: 100%;
    min-height: 100vh;
    background: #fafafa;
    color: #1a1a1a;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  
  .content {
    max-width: 800px;
    margin: 0 auto;
    padding: 100px 24px 60px;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  
  .content.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .section-header {
    margin-bottom: 48px;
    text-align: center;
  }
  
  .station-label {
    display: inline-block;
    padding: 6px 16px;
    background: #f0f0f0;
    border-radius: 20px;
    font-size: 0.875rem;
    color: #666;
    font-weight: 500;
    margin-bottom: 16px;
    letter-spacing: 0.05em;
  }
  
  .title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 12px;
    letter-spacing: -0.02em;
    line-height: 1.3;
  }
  
  .subtitle {
    font-size: 1.125rem;
    color: #666;
    font-weight: 400;
    line-height: 1.6;
  }
  
  .posts-container {
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-bottom: 48px;
  }
  
  .post-card {
    padding: 24px;
    background: #fff;
    border-radius: 12px;
    border: 1px solid #eee;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
    opacity: 0;
    animation: fadeIn 0.5s ease forwards;
  }
  
  .post-card:hover {
    border-color: #ddd;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .post-date {
    font-size: 0.875rem;
    color: #999;
    font-weight: 500;
    display: block;
    margin-bottom: 8px;
  }
  
  .post-title {
    font-size: 1.375rem;
    font-weight: 600;
    margin-bottom: 8px;
    color: #1a1a1a;
    line-height: 1.4;
  }
  
  .post-excerpt {
    font-size: 1rem;
    color: #666;
    line-height: 1.6;
    margin-bottom: 16px;
  }
  
  .post-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  
  .tag {
    padding: 4px 12px;
    background: #f5f5f5;
    border-radius: 14px;
    font-size: 0.75rem;
    color: #555;
    font-weight: 500;
  }
  
  .navigation-section {
    text-align: center;
    padding-top: 24px;
    border-top: 1px solid #eee;
  }
  
  .nav-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: #1a1a1a;
    text-decoration: none;
    font-weight: 600;
    font-size: 1rem;
    padding: 12px 24px;
    border-radius: 8px;
    transition: background 0.2s ease;
  }
  
  .nav-link:hover {
    background: #f0f0f0;
  }
  
  .arrow {
    width: 20px;
    height: 20px;
  }
  
  .footer {
    position: absolute;
    bottom: 24px;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 0.875rem;
    color: #999;
  }
  
  @media (max-width: 768px) {
    .title {
      font-size: 2rem;
    }
    
    .content {
      padding: 80px 20px 40px;
    }
    
    .post-card {
      padding: 20px;
    }
  }
</style>
