<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import LanguageSwitcher from '$lib/components/LanguageSwitcher.svelte';
  import { getDictionary } from '$lib/i18n/index.js';
  
  // 获取当前语言
  let currentLang = $derived($page.url.pathname.startsWith('/zh') ? 'zh' : 'en');
  let t = $derived(getDictionary(currentLang));
  
  // Hero 动画状态
  let progress = $state(0);
  let animationStarted = $state(false);
  let animationComplete = $state(false);
  
  // 页面内容可见性
  let contentVisible = $state(false);
  
  // 派生状态
  let sunOpacity = $derived(Math.max(0, Math.min(1, (progress - 0.1) * 2)));
  let starsOpacity = $derived(Math.max(0, 1 - progress * 1.5));
  let boatOpacity = $derived(Math.max(0, Math.min(1, (progress - 0.5) * 3)));
  let textOpacity = $derived(Math.max(0, Math.min(1, (progress - 0.7) * 4)));
  
  // 太阳位置（弧线路径）
  let sunX = $derived(50 + Math.sin(progress * Math.PI) * 35);
  let sunY = $derived(85 - progress * 65);
  
  // 颜色过渡
  let skyColorTop = $derived(interpolateColor('#020617', '#1e3a5f', progress));
  let skyColorBottom = $derived(interpolateColor('#0f172a', '#7dd3fc', progress));
  let seaColorTop = $derived(interpolateColor('#000814', '#0369a1', progress));
  let seaColorBottom = $derived(interpolateColor('#001219', '#0c1929', progress));
  
  function interpolateColor(color1, color2, t) {
    const c1 = hexToRgb(color1);
    const c2 = hexToRgb(color2);
    const r = Math.round(c1.r + (c2.r - c1.r) * t);
    const g = Math.round(c1.g + (c2.g - c1.g) * t);
    const b = Math.round(c1.b + (c2.b - c1.b) * t);
    return `rgb(${r}, ${g}, ${b})`;
  }
  
  function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  }
  
  // 星星数据
  const stars = $state(
    Array.from({ length: 50 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 60,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 2
    }))
  );
  
  // 动画控制
  onMount(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      progress = 1;
      animationComplete = true;
      contentVisible = true;
      return;
    }
    
    const startTimer = setTimeout(() => {
      animationStarted = true;
      animate();
    }, 500);
    
    return () => clearTimeout(startTimer);
  });
  
  function animate() {
    const duration = 4000;
    const startTime = performance.now();
    
    function frame(currentTime) {
      const elapsed = currentTime - startTime;
      progress = Math.min(1, elapsed / duration);
      
      if (progress >= 1) {
        animationComplete = true;
        setTimeout(() => {
          contentVisible = true;
        }, 300);
      }
      
      if (progress < 1) {
        requestAnimationFrame(frame);
      }
    }
    
    requestAnimationFrame(frame);
  }
  
  // 探索按钮点击 - 页面跳转动画
  let isNavigating = $state(false);
  
  async function handleExplore(event) {
    event.preventDefault();
    
    if (isNavigating) return;
    isNavigating = true;
    
    // 小船驶出动画
    const boatEl = document.querySelector('.hero-boat');
    if (boatEl) {
      boatEl.style.transition = 'all 0.8s ease-in-out';
      boatEl.style.transform = 'translateX(200vw)';
    }
    
    // 内容消失
    contentVisible = false;
    
    // 等待动画完成
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // 跳转到博客页面
    const blogPath = currentLang === 'zh' ? '/zh/blog' : '/blog';
    await goto(blogPath);
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
  <!-- 多语言 SEO -->
  <link rel="alternate" hreflang="en" href="https://zevarc.com/" />
  <link rel="alternate" hreflang="zh-Hans" href="https://zevarc.com/zh" />
  <link rel="alternate" hreflang="x-default" href="https://zevarc.com/" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
</svelte:head>

<!-- 语言切换器 -->
<LanguageSwitcher />

<div class="hero-container">
  <!-- 天空背景 -->
  <div 
    class="sky"
    style="background: linear-gradient(to bottom, {skyColorTop} 0%, {skyColorBottom} 100%)"
  >
    <!-- 星星层 -->
    <div class="stars-layer" style="opacity: {starsOpacity}">
      {#each stars as star, i}
        <div 
          class="star"
          style="left: {star.x}%; top: {star.y}%; width: {star.size}px; height: {star.size}px; animation-delay: {star.delay}s"
        ></div>
      {/each}
    </div>
    
    <!-- 太阳 -->
    <div 
      class="sun"
      style="left: {sunX}%; top: {sunY}%; opacity: {sunOpacity}"
    >
      <div class="sun-core"></div>
      <div class="sun-glow"></div>
    </div>
  </div>
  
  <!-- 地平线过渡层 -->
  <div class="horizon-blend"></div>
  
  <!-- 海洋 -->
  <div 
    class="sea"
    style="background: linear-gradient(to bottom, {seaColorTop} 0%, {seaColorBottom} 100%)"
  >
    <!-- 波浪层 -->
    <div class="wave-layer wave-far">
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M0,60 C150,90 350,30 600,60 C850,90 1050,30 1200,60 L1200,120 L0,120 Z" fill="currentColor"/>
      </svg>
    </div>
    <div class="wave-layer wave-mid">
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M0,60 C200,100 400,20 600,60 C800,100 1000,20 1200,60 L1200,120 L0,120 Z" fill="currentColor"/>
      </svg>
    </div>
    <div class="wave-layer wave-near">
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M0,60 C300,120 600,0 900,60 C1050,90 1150,30 1200,60 L1200,120 L0,120 Z" fill="currentColor"/>
      </svg>
    </div>
    
    <!-- 水面波光 -->
    <div class="shimmer" style="opacity: {progress * 0.5}">
      <div class="shimmer-line"></div>
      <div class="shimmer-line" style="animation-delay: 0.5s"></div>
      <div class="shimmer-line" style="animation-delay: 1s"></div>
    </div>
    
    <!-- 小船 -->
    <div 
      class="hero-boat"
      style="opacity: {boatOpacity}"
    >
      <svg viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg">
        <path d="M20,45 Q50,55 80,45 L75,55 Q50,62 25,55 Z" fill="#0f172a"/>
        <path d="M50,45 L50,10 Q65,25 50,40 Z" fill="#0f172a"/>
        <line x1="50" y1="45" x2="50" y2="8" stroke="#0f172a" stroke-width="2"/>
      </svg>
    </div>
  </div>
  
  <!-- 内容层 -->
  <div class="content" class:visible={contentVisible}>
    <h1 class="title">
      {t.hero.title}
      <span class="phonetic">{t.hero.phonetic}</span>
    </h1>
    
    <!-- 词源解释 -->
    <div class="etymology">
      <span class="etym-item">{t.hero.etymology.zero}</span>
      <span class="etym-plus">+</span>
      <span class="etym-item">{t.hero.etymology.evolution}</span>
      <span class="etym-plus">+</span>
      <span class="etym-item">{t.hero.etymology.arc}</span>
    </div>
    
    <p class="slogan">{t.hero.slogan}</p>
    
    <!-- 技术标签 -->
    <div class="topics">
      {#each t.hero.topics as topic}
        <span class="topic-tag">{topic}</span>
      {/each}
    </div>
    
    <p class="description">{t.hero.description}</p>
    
    <a href="/blog" class="cta-button" onclick={handleExplore}>
      {t.hero.cta}
      <span class="arrow">→</span>
    </a>
  </div>
  
  <!-- 暗角效果 -->
  <div class="vignette"></div>
</div>

<style>
  .hero-container {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
  }
  
  /* 天空 */
  .sky {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 60%;
    transition: background 1.5s ease;
  }
  
  .stars-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: opacity 1s ease;
  }
  
  .star {
    position: absolute;
    background: white;
    border-radius: 50%;
    animation: twinkle 2s ease-in-out infinite;
  }
  
  @keyframes twinkle {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 1; }
  }
  
  /* 太阳 */
  .sun {
    position: absolute;
    transform: translate(-50%, -50%);
    transition: all 0.3s ease-out;
  }
  
  .sun-core {
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, #fef3c7, #fbbf24);
    border-radius: 50%;
    position: relative;
    z-index: 2;
  }
  
  .sun-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 120px;
    height: 120px;
    background: radial-gradient(circle, rgba(251, 191, 36, 0.4) 0%, transparent 70%);
    border-radius: 50%;
    z-index: 1;
    animation: pulse 3s ease-in-out infinite;
  }
  
  @keyframes pulse {
    0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
    50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.8; }
  }
  
  /* 地平线过渡层 */
  .horizon-blend {
    position: absolute;
    top: 55%;
    left: 0;
    width: 100%;
    height: 15%;
    background: linear-gradient(
      to bottom,
      rgba(15, 23, 42, 0) 0%,
      rgba(15, 23, 42, 0.3) 30%,
      rgba(3, 105, 161, 0.5) 60%,
      rgba(3, 105, 161, 0.8) 100%
    );
    filter: blur(8px);
    z-index: 2;
    pointer-events: none;
  }
  
  /* 海洋 */
  .sea {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 45%;
    transition: background 1.5s ease;
    overflow: hidden;
  }
  
  .wave-layer {
    position: absolute;
    left: 0;
    width: 200%;
    height: 80px;
    display: flex;
    transition: opacity 1s ease;
  }
  
  .wave-layer svg {
    width: 50%;
    height: 100%;
  }
  
  .wave-far {
    top: -20px;
    color: rgba(56, 189, 248, 0.2);
    animation: wave-move 25s linear infinite;
  }
  
  .wave-mid {
    top: 10px;
    color: rgba(56, 189, 248, 0.35);
    animation: wave-move 18s linear infinite reverse;
  }
  
  .wave-near {
    top: 35px;
    color: rgba(56, 189, 248, 0.5);
    animation: wave-move 12s linear infinite;
  }
  
  @keyframes wave-move {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  
  .shimmer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    opacity: 0;
    transition: opacity 1s ease;
  }
  
  .shimmer-line {
    position: absolute;
    width: 200%;
    height: 2px;
    background: linear-gradient(90deg, transparent 0%, rgba(251, 191, 36, 0.3) 20%, rgba(251, 191, 36, 0.5) 50%, rgba(251, 191, 36, 0.3) 80%, transparent 100%);
    top: 20%;
    animation: shimmer 4s ease-in-out infinite;
  }
  
  @keyframes shimmer {
    0%, 100% { transform: translateX(-50%) scaleX(0.5); opacity: 0.3; }
    50% { transform: translateX(0%) scaleX(1); opacity: 0.6; }
  }
  
  .hero-boat {
    position: absolute;
    bottom: 25%;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 48px;
    transition: opacity 0.5s ease;
    animation: rock 4s ease-in-out infinite;
    z-index: 10;
  }
  
  @keyframes rock {
    0%, 100% { transform: translateX(-50%) rotate(-2deg); }
    50% { transform: translateX(-50%) rotate(2deg); }
  }
  
  /* 内容层 */
  .content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: white;
    z-index: 20;
    padding: 0 20px;
    opacity: 0;
    transition: opacity 0.8s ease;
    max-width: 700px;
  }
  
  .content.visible {
    opacity: 1;
  }
  
  .title {
    font-size: clamp(3rem, 8vw, 5rem);
    font-weight: 700;
    margin: 0;
    letter-spacing: 0.1em;
    text-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
    background: linear-gradient(135deg, #ffffff 0%, #7dd3fc 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    flex-wrap: wrap;
  }
  
  .phonetic {
    font-size: clamp(1rem, 2.5vw, 1.5rem);
    font-weight: 300;
    font-family: 'JetBrains Mono', monospace;
    color: rgba(251, 191, 36, 0.9);
    -webkit-text-fill-color: rgba(251, 191, 36, 0.9);
    letter-spacing: 0.05em;
  }
  
  /* 词源解释 */
  .etymology {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin: 24px 0;
    flex-wrap: wrap;
  }
  
  .etym-item {
    font-family: 'JetBrains Mono', monospace;
    font-size: clamp(0.875rem, 2vw, 1.125rem);
    padding: 8px 16px;
    background: rgba(56, 189, 248, 0.15);
    border: 1px solid rgba(56, 189, 248, 0.3);
    border-radius: 8px;
    color: #7dd3fc;
  }
  
  .etym-plus {
    font-size: 1.25rem;
    color: rgba(251, 191, 36, 0.8);
  }
  
  .slogan {
    font-size: clamp(1.125rem, 2.5vw, 1.5rem);
    margin: 20px 0;
    font-weight: 500;
    color: #f8fafc;
    letter-spacing: 0.05em;
  }
  
  /* 技术标签 */
  .topics {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin: 20px 0;
    flex-wrap: wrap;
  }
  
  .topic-tag {
    padding: 6px 14px;
    background: rgba(251, 191, 36, 0.15);
    border: 1px solid rgba(251, 191, 36, 0.3);
    border-radius: 20px;
    font-size: 0.875rem;
    color: #fbbf24;
    transition: all 0.3s ease;
  }
  
  .topic-tag:hover {
    background: rgba(251, 191, 36, 0.25);
    transform: translateY(-2px);
  }
  
  .description {
    font-size: clamp(0.875rem, 2vw, 1rem);
    margin: 20px 0 30px;
    opacity: 0.7;
    max-width: 500px;
    line-height: 1.6;
  }
  
  .cta-button {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 2rem;
    font-size: 1rem;
    font-weight: 500;
    color: #020617;
    background: linear-gradient(135deg, #7dd3fc 0%, #38bdf8 100%);
    border: none;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 20px rgba(56, 189, 248, 0.4);
    text-decoration: none;
  }
  
  .cta-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 30px rgba(56, 189, 248, 0.6);
  }
  
  .arrow {
    transition: transform 0.3s ease;
  }
  
  .cta-button:hover .arrow {
    transform: translateX(4px);
  }
  
  /* 暗角效果 */
  .vignette {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(ellipse at center, transparent 40%, rgba(0, 0, 0, 0.4) 100%);
    pointer-events: none;
    z-index: 15;
  }
  
  /* 响应式 */
  @media (max-width: 768px) {
    .sea {
      height: 50%;
    }
    
    .hero-boat {
      width: 60px;
      height: 36px;
      bottom: 30%;
    }
    
    .title {
      letter-spacing: 0.05em;
    }
    
    .etymology {
      gap: 8px;
    }
    
    .etym-item {
      padding: 6px 12px;
      font-size: 0.75rem;
    }
    
    .cta-button {
      padding: 0.875rem 1.5rem;
      font-size: 0.875rem;
    }
  }
  
  /* 减少动画 */
  @media (prefers-reduced-motion: reduce) {
    .star, .sun-glow, .hero-boat, .wave-layer, .shimmer-line {
      animation: none;
    }
  }
</style>
