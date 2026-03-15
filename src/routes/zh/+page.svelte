<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import LanguageSwitcher from '$lib/components/LanguageSwitcher.svelte';
  import { getDictionary } from '$lib/i18n/index.js';
  
  // 中文版 - 固定使用中文
  let currentLang = $state('zh');
  let t = $derived(getDictionary(currentLang));
  
  let visible = $state(false);
  
  onMount(() => {
    setTimeout(() => {
      visible = true;
    }, 100);
  });
  
  function handleExplore(event) {
    event.preventDefault();
    goto('/zh/blog');
  }
</script>

<svelte:head>
  <title>{t.seo.home.title}</title>
  <meta name="description" content={t.seo.home.description} />
  <meta name="keywords" content="个人品牌,问题解决,技术博客,作品集,演进,Zevarc,Android,C++,Python,前端" />
  <meta property="og:title" content={t.seo.home.title} />
  <meta property="og:description" content={t.seo.home.description} />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="alternate" hreflang="en" href="https://zevarc.com/" />
  <link rel="alternate" hreflang="zh-Hans" href="https://zevarc.com/zh" />
  <link rel="alternate" hreflang="x-default" href="https://zevarc.com/" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
</svelte:head>

<div class="page">
  <LanguageSwitcher />
  
  <main class="content" class:visible>
    <h1 class="title">
      {t.hero.title}
      <span class="phonetic">{t.hero.phonetic}</span>
    </h1>
    
    <div class="etymology">
      <span class="etym-item">{t.hero.etymology.zero}</span>
      <span class="etym-plus">+</span>
      <span class="etym-item">{t.hero.etymology.evolution}</span>
      <span class="etym-plus">+</span>
      <span class="etym-item">{t.hero.etymology.arc}</span>
    </div>
    
    <p class="slogan">{t.hero.slogan}</p>
    
    <div class="topics">
      {#each t.hero.topics as topic}
        <span class="topic-tag">{topic}</span>
      {/each}
    </div>
    
    <p class="description">{t.hero.description}</p>
    
    <a href="/zh/blog" class="cta-button" onclick={handleExplore}>
      {t.hero.cta}
    </a>
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
    padding: 120px 24px 60px;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  
  .content.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .title {
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 16px;
    letter-spacing: -0.02em;
    line-height: 1.2;
  }
  
  .phonetic {
    display: block;
    font-size: 1.5rem;
    font-weight: 400;
    color: #666;
    margin-top: 8px;
    letter-spacing: 0.05em;
  }
  
  .etymology {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 24px;
    flex-wrap: wrap;
  }
  
  .etym-item {
    font-size: 1.25rem;
    color: #333;
    font-weight: 500;
  }
  
  .etym-plus {
    font-size: 1rem;
    color: #999;
  }
  
  .slogan {
    font-size: 1.5rem;
    color: #444;
    margin-bottom: 32px;
    font-weight: 300;
    line-height: 1.6;
  }
  
  .topics {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 32px;
  }
  
  .topic-tag {
    padding: 6px 14px;
    background: #f0f0f0;
    border-radius: 20px;
    font-size: 0.875rem;
    color: #555;
    font-weight: 500;
  }
  
  .description {
    font-size: 1.125rem;
    color: #666;
    line-height: 1.7;
    margin-bottom: 40px;
    max-width: 600px;
  }
  
  .cta-button {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 14px 28px;
    background: #1a1a1a;
    color: #fff;
    text-decoration: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 1rem;
    transition: background 0.2s ease, transform 0.2s ease;
  }
  
  .cta-button:hover {
    background: #333;
    transform: translateY(-2px);
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
      font-size: 2.5rem;
    }
    
    .phonetic {
      font-size: 1.25rem;
    }
    
    .slogan {
      font-size: 1.25rem;
    }
    
    .content {
      padding: 80px 20px 40px;
    }
  }
</style>
