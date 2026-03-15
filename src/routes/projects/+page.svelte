<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import LanguageSwitcher from '$lib/components/LanguageSwitcher.svelte';
  import { getDictionary } from '$lib/i18n/index.js';
  
  let currentLang = $state('en');
  let t = $derived(getDictionary(currentLang));
  
  let visible = $state(false);
  
  onMount(() => {
    setTimeout(() => {
      visible = true;
    }, 100);
  });
  
  const projects = [
    {
      year: '2024',
      title: '智能任务管理系统',
      problem: '团队协作效率低下，任务分配混乱',
      solution: '基于状态机的任务流转系统',
      tech: ['React', 'Node.js', 'PostgreSQL'],
      highlights: ['状态机设计', '实时协作', '权限管理']
    },
    {
      year: '2023',
      title: '数据可视化分析平台',
      problem: '海量数据无法直观理解',
      solution: '拖拽式报表生成器',
      tech: ['Vue.js', 'D3.js', 'Python'],
      highlights: ['可视化组件', '数据管道', '自动化报表']
    },
    {
      year: '2023',
      title: '实时协作白板',
      problem: '远程团队缺乏直观沟通工具',
      solution: '支持多人实时协作的创意白板',
      tech: ['Canvas', 'WebSocket', 'Redis'],
      highlights: ['实时同步', '手写识别', '无限画布']
    }
  ];
  
  async function handleExplore(event) {
    event.preventDefault();
    await goto('/about');
  }
</script>

<svelte:head>
  <title>{t.seo.projects.title}</title>
  <meta name="description" content={t.seo.projects.description} />
  <link rel="alternate" hreflang="en" href="https://zevarc.com/projects" />
  <link rel="alternate" hreflang="zh-Hans" href="https://zevarc.com/zh/projects" />
</svelte:head>

<LanguageSwitcher />

<div class="page">
  <main class="content" class:visible>
    <div class="section-header">
      <span class="station-label">{t.projects.station}</span>
      <h1 class="title">{t.projects.title}</h1>
      <p class="subtitle">{t.projects.subtitle}</p>
    </div>
    
    <div class="projects-container">
      {#each projects as project, i}
        <article class="project-card" style="animation-delay: {0.1 + i * 0.1}s">
          <div class="project-year">{project.year}</div>
          <h2 class="project-title">{project.title}</h2>
          
          <div class="project-section">
            <span class="section-label">{t.projects.problem}</span>
            <p class="section-text">{project.problem}</p>
          </div>
          
          <div class="project-section">
            <span class="section-label">{t.projects.solution}</span>
            <p class="section-text">{project.solution}</p>
          </div>
          
          <div class="project-tech">
            {#each project.tech as tech}
              <span class="tech-tag">{tech}</span>
            {/each}
          </div>
          
          <div class="project-highlights">
            {#each project.highlights as highlight}
              <span class="highlight">{highlight}</span>
            {/each}
          </div>
        </article>
      {/each}
    </div>
    
    <div class="explore-section">
      <a href="/about" class="explore-link" onclick={handleExplore}>
        {t.projects.next}
        <svg class="explore-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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
  
  .projects-container {
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-bottom: 48px;
  }
  
  .project-card {
    padding: 24px;
    background: #fff;
    border-radius: 12px;
    border: 1px solid #eee;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
    opacity: 0;
    animation: fadeIn 0.5s ease forwards;
  }
  
  .project-card:hover {
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
  
  .project-year {
    font-size: 0.875rem;
    color: #999;
    font-weight: 600;
    margin-bottom: 8px;
    letter-spacing: 0.05em;
  }
  
  .project-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 16px;
    color: #1a1a1a;
    line-height: 1.4;
  }
  
  .project-section {
    margin-bottom: 12px;
  }
  
  .section-label {
    display: block;
    font-size: 0.75rem;
    color: #999;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 4px;
  }
  
  .section-text {
    font-size: 1rem;
    color: #555;
    line-height: 1.6;
  }
  
  .project-tech {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid #f0f0f0;
  }
  
  .tech-tag {
    padding: 6px 12px;
    background: #f5f5f5;
    border-radius: 6px;
    font-size: 0.8125rem;
    color: #555;
    font-weight: 500;
    font-family: 'JetBrains Mono', monospace;
  }
  
  .project-highlights {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 12px;
  }
  
  .highlight {
    padding: 4px 10px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 14px;
    font-size: 0.75rem;
    color: #666;
    font-weight: 500;
  }
  
  .explore-section {
    text-align: center;
    padding-top: 24px;
    border-top: 1px solid #eee;
  }
  
  .explore-link {
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
  
  .explore-link:hover {
    background: #f0f0f0;
  }
  
  .explore-arrow {
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
    
    .project-card {
      padding: 20px;
    }
  }
</style>
