<script>
  import { onMount } from 'svelte';
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
</script>

<svelte:head>
  <title>{t.seo.about.title}</title>
  <meta name="description" content={t.seo.about.description} />
  <link rel="alternate" hreflang="en" href="https://zevarc.com/about" />
  <link rel="alternate" hreflang="zh-Hans" href="https://zevarc.com/zh/about" />
</svelte:head>

<LanguageSwitcher />

<div class="page">
  <main class="content" class:visible>
    <h1 class="title">{t.about.title}</h1>
    <p class="intro">{t.about.intro}</p>
    
    <section class="methodology">
      <h2 class="section-title">{t.about.methodology}</h2>
      <div class="methodology-grid">
        {#each t.about.steps as step, i}
          <div class="method-card">
            <span class="step-number">0{i + 1}</span>
            <h3 class="step-title">{step.title}</h3>
            <p class="step-desc">{step.desc}</p>
          </div>
        {/each}
      </div>
    </section>
    
    <section class="skills">
      <h2 class="section-title">{t.about.skills}</h2>
      <div class="skills-grid">
        <div class="skill-category">
          <h3 class="category-title">{t.about.frontend}</h3>
          <div class="skill-tags">
            {#each ['React', 'Vue', 'Svelte', 'TypeScript', 'CSS3'] as skill}
              <span class="skill-tag">{skill}</span>
            {/each}
          </div>
        </div>
        <div class="skill-category">
          <h3 class="category-title">{t.about.backend}</h3>
          <div class="skill-tags">
            {#each ['Node.js', 'Python', 'PostgreSQL', 'Redis'] as skill}
              <span class="skill-tag">{skill}</span>
            {/each}
          </div>
        </div>
        <div class="skill-category">
          <h3 class="category-title">{t.about.tools}</h3>
          <div class="skill-tags">
            {#each ['Git', 'Docker', 'Figma', 'Vim'] as skill}
              <span class="skill-tag">{skill}</span>
            {/each}
          </div>
        </div>
      </div>
    </section>
    
    <section class="timeline">
      <h2 class="section-title">{t.about.timeline}</h2>
      <div class="timeline-container">
        {#each t.about.history as item}
          <div class="timeline-item">
            <span class="timeline-year">{item.year}</span>
            <div class="timeline-content">
              <h3 class="timeline-title">{item.title}</h3>
              <p class="timeline-desc">{item.desc}</p>
            </div>
          </div>
        {/each}
      </div>
    </section>
    
    <div class="back-section">
      <a href="/" class="back-link">{t.about.back_to_start}</a>
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
  
  .title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 16px;
    letter-spacing: -0.02em;
    line-height: 1.3;
    text-align: center;
  }
  
  .intro {
    font-size: 1.25rem;
    color: #555;
    line-height: 1.7;
    text-align: center;
    margin-bottom: 48px;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .section-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 24px;
    letter-spacing: -0.01em;
    color: #1a1a1a;
  }
  
  .methodology {
    margin-bottom: 48px;
  }
  
  .methodology-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
  
  .method-card {
    padding: 20px;
    background: #fff;
    border-radius: 10px;
    border: 1px solid #eee;
  }
  
  .step-number {
    display: block;
    font-size: 0.875rem;
    font-weight: 700;
    color: #999;
    margin-bottom: 8px;
    letter-spacing: 0.05em;
  }
  
  .step-title {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 6px;
    color: #1a1a1a;
  }
  
  .step-desc {
    font-size: 0.9375rem;
    color: #666;
    line-height: 1.5;
  }
  
  .skills {
    margin-bottom: 48px;
  }
  
  .skills-grid {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .skill-category {
    padding: 20px;
    background: #fff;
    border-radius: 10px;
    border: 1px solid #eee;
  }
  
  .category-title {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 12px;
    color: #1a1a1a;
  }
  
  .skill-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  
  .skill-tag {
    padding: 6px 12px;
    background: #f5f5f5;
    border-radius: 6px;
    font-size: 0.8125rem;
    color: #555;
    font-weight: 500;
    font-family: 'JetBrains Mono', monospace;
  }
  
  .timeline {
    margin-bottom: 48px;
  }
  
  .timeline-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .timeline-item {
    display: flex;
    gap: 20px;
    padding: 16px;
    background: #fff;
    border-radius: 10px;
    border: 1px solid #eee;
  }
  
  .timeline-year {
    font-size: 0.9375rem;
    font-weight: 700;
    color: #1a1a1a;
    min-width: 60px;
    letter-spacing: 0.02em;
  }
  
  .timeline-title {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 4px;
    color: #1a1a1a;
  }
  
  .timeline-desc {
    font-size: 0.9375rem;
    color: #666;
    line-height: 1.5;
  }
  
  .back-section {
    text-align: center;
    padding-top: 24px;
    border-top: 1px solid #eee;
  }
  
  .back-link {
    display: inline-block;
    color: #1a1a1a;
    text-decoration: none;
    font-weight: 600;
    font-size: 1rem;
    padding: 12px 24px;
    border-radius: 8px;
    transition: background 0.2s ease;
  }
  
  .back-link:hover {
    background: #f0f0f0;
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
    
    .methodology-grid {
      grid-template-columns: 1fr;
    }
    
    .timeline-item {
      flex-direction: column;
      gap: 8px;
    }
  }
</style>
