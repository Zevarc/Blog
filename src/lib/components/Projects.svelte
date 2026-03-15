<script>
  import { onMount } from 'svelte';

  let visible = $state(false);
  let sectionEl;

  const projects = [
    {
      id: 1,
      title: '智能任务管理系统',
      year: '2024',
      problem: '团队协作效率低下，任务分配混乱，无法追踪项目进度',
      decomposition: [
        '将「任务管理」拆解为：创建、分配、执行、验收、归档',
        '识别核心实体：任务、用户、团队、项目',
        '设计状态流转图：待处理 → 进行中 → 待验收 → 已完成'
      ],
      solution: '基于状态机的任务流转系统，支持自定义工作流',
      techStack: ['React', 'Node.js', 'PostgreSQL', 'WebSocket'],
      demoUrl: '#',
      sourceUrl: '#'
    },
    {
      id: 2,
      title: '数据可视化分析平台',
      year: '2023',
      problem: '海量业务数据无法直观理解，报表制作耗时，数据孤岛严重',
      decomposition: [
        '将「数据可视化」拆解为：数据源 → 清洗 → 聚合 → 渲染',
        '设计模块化图表组件：折线图、柱状图、饼图、地图',
        '建立数据管道：ETL → Data Warehouse → API Layer'
      ],
      solution: '拖拽式报表生成器，支持50+可视化组件',
      techStack: ['Vue.js', 'D3.js', 'Python', 'Airflow', 'Redshift'],
      demoUrl: '#',
      sourceUrl: '#'
    },
    {
      id: 3,
      title: '个人知识管理系统',
      year: '2023',
      problem: '学习资料散落各处，无法建立知识连接，检索效率低',
      decomposition: [
        '将「知识管理」拆解为：收集 → 整理 → 连接 → 输出',
        '设计双向链接机制：原子笔记 ↔ 主题笔记',
        '建立自动标签系统和智能推荐算法'
      ],
      solution: '支持双向链接的个人数字花园',
      techStack: ['Svelte', 'Electron', 'SQLite', 'Markdown'],
      demoUrl: '#',
      sourceUrl: '#'
    }
  ];

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            visible = true;
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionEl) {
      observer.observe(sectionEl);
    }

    return () => observer.disconnect();
  });
</script>

<div class="projects-container" bind:this={sectionEl} class:visible>
  <div class="projects-list">
    {#each projects as project, i}
      <article 
        class="project-card"
        style="animation-delay: {i * 150}ms"
      >
        <div class="project-header">
          <div class="project-meta">
            <span class="project-year">{project.year}</span>
            <h3 class="project-title">{project.title}</h3>
          </div>
          <div class="project-links">
            <a href={project.demoUrl} class="project-link" target="_blank" rel="noopener">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              Demo
            </a>
            <a href={project.sourceUrl} class="project-link" target="_blank" rel="noopener">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/>
              </svg>
              Code
            </a>
          </div>
        </div>

        <div class="project-body">
          <div class="problem-section">
            <span class="label">Problem</span>
            <p>{project.problem}</p>
          </div>

          <div class="decomposition-section">
            <span class="label">Decomposition</span>
            <ul class="decomposition-list">
              {#each project.decomposition as step}
                <li>{step}</li>
              {/each}
            </ul>
          </div>

          <div class="solution-section">
            <span class="label">Solution</span>
            <p>{project.solution}</p>
          </div>
        </div>

        <div class="project-footer">
          <div class="tech-stack">
            {#each project.techStack as tech}
              <span class="tech-tag">{tech}</span>
            {/each}
          </div>
        </div>
      </article>
    {/each}
  </div>
</div>

<style>
  .projects-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 0 24px 80px;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  .projects-container.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .projects-list {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
  
  .project-card {
    background: rgba(17, 24, 39, 0.6);
    border: 1px solid rgba(31, 41, 55, 0.5);
    border-radius: 16px;
    padding: 28px;
    opacity: 0;
    transform: translateY(20px);
    animation: cardAppear 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    animation-delay: inherit;
    transition: all 0.4s ease;
  }
  
  @keyframes cardAppear {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .project-card:hover {
    border-color: #F59E0B;
    box-shadow: 0 0 40px rgba(245, 158, 11, 0.1);
    transform: translateY(-2px);
  }
  
  .project-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 20px;
    flex-wrap: wrap;
    gap: 16px;
  }
  
  .project-meta {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  
  .project-year {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.7rem;
    color: #F59E0B;
  }
  
  .project-title {
    font-size: 1.35rem;
    font-weight: 600;
    color: #F9FAFB;
    margin: 0;
  }
  
  .project-links {
    display: flex;
    gap: 14px;
  }
  
  .project-link {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 0.8rem;
    color: #9CA3AF;
    text-decoration: none;
    transition: color 0.3s ease;
  }
  
  .project-link:hover {
    color: #F59E0B;
  }
  
  .project-body {
    display: grid;
    gap: 16px;
    margin-bottom: 20px;
  }
  
  .label {
    display: inline-block;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.65rem;
    color: #F59E0B;
    background: rgba(245, 158, 11, 0.1);
    padding: 4px 10px;
    border-radius: 4px;
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
  
  .problem-section p,
  .solution-section p {
    color: #D1D5DB;
    margin: 0;
    line-height: 1.6;
  }
  
  .decomposition-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  
  .decomposition-list li {
    color: #D1D5DB;
    padding-left: 18px;
    position: relative;
    line-height: 1.5;
    font-size: 0.9rem;
  }
  
  .decomposition-list li::before {
    content: '→';
    position: absolute;
    left: 0;
    color: #F59E0B;
  }
  
  .project-footer {
    padding-top: 16px;
    border-top: 1px solid rgba(31, 41, 55, 0.5);
  }
  
  .tech-stack {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  
  .tech-tag {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.65rem;
    color: #6B7280;
    background: rgba(17, 24, 39, 0.8);
    padding: 4px 10px;
    border-radius: 4px;
    border: 1px solid rgba(31, 41, 55, 0.5);
  }
  
  @media (max-width: 767px) {
    .project-card {
      padding: 20px;
    }
    
    .project-header {
      flex-direction: column;
    }
    
    .project-links {
      width: 100%;
      justify-content: flex-start;
    }
    
    .project-title {
      font-size: 1.15rem;
    }
  }
</style>
