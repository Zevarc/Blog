<script>
  import { onMount } from 'svelte';

  let visible = $state(false);
  let sectionEl;

  const posts = [
    {
      id: 1,
      title: 'Hello World: Zevarc 的诞生',
      date: '2024-03-01',
      readTime: '5 min read',
      excerpt: '为什么我要创建一个以「演进」为核心的个人品牌？这篇文章讲述 Zevarc 的诞生故事和核心理念。',
      url: '#'
    },
    {
      id: 2,
      title: '问题拆解的艺术：从复杂到简单的思考方式',
      date: '2024-03-10',
      readTime: '8 min read',
      excerpt: '面对复杂问题，我们往往感到无从下手。本文分享我将复杂问题拆解为简单单元的具体方法论。',
      url: '#'
    },
    {
      id: 3,
      title: '如何搭建这个网站：技术选型与设计思考',
      date: '2024-03-15',
      readTime: '6 min read',
      excerpt: '从零开始搭建个人网站的技术总结，包括 Svelte 5 的使用体验和日出动画的实现细节。',
      url: '#'
    }
  ];

  function formatDate(dateStr) {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  }

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

<div class="blog-container" bind:this={sectionEl} class:visible>
  <div class="blog-list">
    {#each posts as post, i}
      <a 
        href={post.url}
        class="blog-row"
        style="animation-delay: {i * 100}ms"
      >
        <span class="post-date">{formatDate(post.date)}</span>
        <div class="post-content">
          <h3 class="post-title">{post.title}</h3>
          <p class="post-excerpt">{post.excerpt}</p>
        </div>
        <span class="post-read-time">{post.readTime}</span>
        <svg class="arrow-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="5" y1="12" x2="19" y2="12"/>
          <polyline points="12 5 19 12 12 19"/>
        </svg>
      </a>
    {/each}
  </div>
</div>

<style>
  .blog-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 24px 80px;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  .blog-container.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .blog-list {
    display: flex;
    flex-direction: column;
  }
  
  .blog-row {
    display: flex;
    align-items: center;
    gap: 24px;
    padding: 28px 0;
    border-bottom: 1px solid rgba(31, 41, 55, 0.5);
    text-decoration: none;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  .blog-row:first-child {
    border-top: 1px solid rgba(31, 41, 55, 0.5);
  }
  
  .blog-row:hover {
    background: rgba(17, 24, 39, 0.5);
    margin: 0 -24px;
    padding: 28px 24px;
    border-radius: 12px;
    border-bottom-color: transparent;
  }
  
  .blog-row:hover .post-date {
    color: #F59E0B;
  }
  
  .blog-row:hover .post-title {
    color: #F59E0B;
    transform: translateX(6px);
  }
  
  .blog-row:hover .arrow-icon {
    opacity: 1;
    transform: translateX(0);
  }
  
  .post-date {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.8rem;
    color: #6B7280;
    flex-shrink: 0;
    width: 90px;
    transition: color 0.3s ease;
  }
  
  .post-content {
    flex: 1;
    min-width: 0;
  }
  
  .post-title {
    font-size: 1.1rem;
    font-weight: 500;
    color: #F9FAFB;
    margin: 0 0 8px;
    transition: all 0.3s ease;
  }
  
  .post-excerpt {
    font-size: 0.875rem;
    color: #6B7280;
    margin: 0;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .post-read-time {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.7rem;
    color: #4B5563;
    flex-shrink: 0;
    display: none;
  }
  
  .arrow-icon {
    color: #F59E0B;
    flex-shrink: 0;
    opacity: 0;
    transform: translateX(-10px);
    transition: all 0.3s ease;
  }
  
  @media (min-width: 640px) {
    .post-read-time {
      display: block;
    }
  }
  
  @media (max-width: 767px) {
    .blog-row {
      flex-wrap: wrap;
      gap: 12px;
    }
    
    .post-date {
      width: auto;
    }
    
    .post-title {
      font-size: 1rem;
    }
    
    .post-excerpt {
      display: none;
    }
    
    .arrow-icon {
      display: none;
    }
  }
</style>
