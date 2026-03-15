<script>
  import { onMount } from 'svelte';

  let visible = $state(false);
  let sectionEl;

  const skills = [
    'JavaScript', 'TypeScript', 'Svelte', 'React', 'Node.js',
    'Python', 'PostgreSQL', 'MongoDB', 'Docker', 'AWS',
    'GraphQL', 'REST API', 'Git', 'CI/CD', 'System Design'
  ];

  const methodology = [
    { step: '01', title: '拆解', description: '将复杂问题分解为最小的可处理单元' },
    { step: '02', title: '分析', description: '识别每个单元之间的关联和依赖' },
    { step: '03', title: '演进', description: '从最简单的解开始，逐步迭代优化' },
    { step: '04', title: '整合', description: '将各个单元的解决方案有机融合' }
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
      { threshold: 0.2 }
    );

    if (sectionEl) {
      observer.observe(sectionEl);
    }

    return () => observer.disconnect();
  });
</script>

<div class="about-container" bind:this={sectionEl} class:visible>
  <div class="about-content">
    <div class="about-text">
      <p class="lead">
        Zevarc 不仅仅是一个名字，它是解决问题的方法论。
      </p>
      <p>
        「从 Zero 开始，沿 Arc 演进」——我相信任何复杂的问题都可以被拆解为最简单的单元。当我们将一个庞大的难题分解为若干个可管理的小问题时，解决它就变得不再可怕。
      </p>
      <p>
        每一次的问题解决都是一次演进。在这个过程中，我获得了成长，也找到了快乐。这就是 Zevarc 想要传达的核心理念：<strong>在曲折中前行，在演进中领悟</strong>。
      </p>

      <div class="methodology">
        <h3>方法论</h3>
        <div class="method-steps">
          {#each methodology as method, i}
            <div class="method-step" style="animation-delay: {i * 100}ms">
              <span class="step-number">{method.step}</span>
              <div class="step-content">
                <span class="step-title">{method.title}</span>
                <span class="step-desc">{method.description}</span>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>

    <div class="about-skills">
      <h3>技术栈</h3>
      <div class="skills-grid">
        {#each skills as skill, i}
          <span 
            class="skill-tag"
            style="animation-delay: {i * 30}ms"
          >
            {skill}
          </span>
        {/each}
      </div>
    </div>
  </div>
</div>

<style>
  .about-container {
    max-width: 1024px;
    margin: 0 auto;
    padding: 0 24px 80px;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  .about-container.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .about-content {
    display: grid;
    grid-template-columns: 1fr;
    gap: 60px;
  }
  
  @media (min-width: 768px) {
    .about-content {
      grid-template-columns: 1.2fr 0.8fr;
      gap: 80px;
    }
  }
  
  .about-text {
    color: #9CA3AF;
    line-height: 1.8;
  }
  
  .lead {
    font-size: 1.2rem;
    color: #F9FAFB;
    margin-bottom: 24px;
    font-weight: 500;
  }
  
  .about-text p {
    margin-bottom: 20px;
  }
  
  .about-text strong {
    color: #F59E0B;
    font-weight: 500;
  }
  
  .methodology {
    margin-top: 40px;
  }
  
  .methodology h3 {
    font-size: 1rem;
    color: #F9FAFB;
    margin-bottom: 20px;
    font-weight: 500;
  }
  
  .method-steps {
    display: grid;
    gap: 14px;
  }
  
  .method-step {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    padding: 14px;
    background: rgba(17, 24, 39, 0.5);
    border: 1px solid rgba(31, 41, 55, 0.5);
    border-radius: 8px;
    transition: all 0.3s ease;
  }
  
  .method-step:hover {
    border-color: #F59E0B;
    background: rgba(245, 158, 11, 0.05);
  }
  
  .step-number {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.7rem;
    color: #F59E0B;
    background: rgba(245, 158, 11, 0.1);
    padding: 4px 8px;
    border-radius: 4px;
    flex-shrink: 0;
  }
  
  .step-content {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  
  .step-title {
    font-size: 0.9rem;
    color: #F9FAFB;
    font-weight: 500;
  }
  
  .step-desc {
    font-size: 0.75rem;
    color: #9CA3AF;
  }
  
  .about-skills h3 {
    font-size: 1rem;
    color: #F9FAFB;
    margin-bottom: 20px;
    font-weight: 500;
  }
  
  .skills-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  
  .skill-tag {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.7rem;
    color: #9CA3AF;
    background: rgba(17, 24, 39, 0.8);
    padding: 8px 14px;
    border-radius: 20px;
    border: 1px solid rgba(31, 41, 55, 0.5);
    transition: all 0.3s ease;
    opacity: 0;
    animation: fadeIn 0.5s ease forwards;
  }
  
  .skill-tag:hover {
    color: #F59E0B;
    border-color: #F59E0B;
    background: rgba(245, 158, 11, 0.1);
    transform: translateY(-2px);
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
  
  @media (max-width: 767px) {
    .method-step {
      padding: 12px;
    }
    
    .skill-tag {
      font-size: 0.65rem;
      padding: 6px 10px;
    }
  }
</style>
