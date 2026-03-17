<script>
  import { onMount } from 'svelte';

  let visible = $state(false);
  let sectionEl;

  let { projects, labels } = $props();

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
              {labels.demo}
            </a>
            <a href={project.sourceUrl} class="project-link" target="_blank" rel="noopener">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/>
              </svg>
              {labels.code}
            </a>
          </div>
        </div>

        <div class="project-body">
          <div class="problem-section">
            <span class="label">{labels.problem}</span>
            <p>{project.problem}</p>
          </div>

          <div class="decomposition-section">
            <span class="label">{labels.decomposition}</span>
            <ul class="decomposition-list">
              {#each project.decomposition as step}
                <li>{step}</li>
              {/each}
            </ul>
          </div>

          <div class="solution-section">
            <span class="label">{labels.solution}</span>
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
    font-size: .875rem;
    color: #fbbf24;
    font-family: JetBrains Mono, monospace;
    margin-bottom: 8px;
  }
  
  .project-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #f1f5f9;
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
    padding: 4px 12px;
    background: #38bdf826;
    color: #38bdf8;
    font-size: .75rem;
    font-weight: 600;
    border-radius: 4px;
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: .05em;
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
    border: 1px solid rgba(31, 41, 55, 0.5);
    padding: 6px 14px;
    background: #64748b4d;
    color: #e2e8f0;
    font-size: .875rem;
    border-radius: 6px;
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
