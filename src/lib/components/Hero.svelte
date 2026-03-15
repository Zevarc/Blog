<script>
  import { onMount } from 'svelte';

  // Svelte 5 Runes 状态管理
  let progress = $state(0);
  let animationStarted = $state(false);
  let containerEl;

  // 派生状态
  let isDaytime = $derived(progress > 0.6);
  let sunOpacity = $derived(Math.max(0, Math.min(1, (progress - 0.1) * 2)));
  let starsOpacity = $derived(Math.max(0, 1 - progress * 1.5));
  let boatOpacity = $derived(Math.max(0, Math.min(1, (progress - 0.5) * 3)));
  let textOpacity = $derived(Math.max(0, Math.min(1, (progress - 0.7) * 4)));

  // 太阳位置计算（弧线路径）
  let sunX = $derived(50 + Math.sin(progress * Math.PI) * 35);
  let sunY = $derived(85 - progress * 65);

  // 天空颜色过渡
  let skyColorTop = $derived(interpolateColor('#020617', '#0ea5e9', progress));
  let skyColorBottom = $derived(interpolateColor('#1e1b4b', '#7dd3fc', progress));
  
  // 海面颜色过渡
  let seaColor = $derived(interpolateColor('#000000', '#0369a1', progress));

  // 颜色插值函数
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
    // 检测是否用户偏好减少动画
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      progress = 1;
      return;
    }

    // 延迟开始动画
    const startTimer = setTimeout(() => {
      animationStarted = true;
      animate();
    }, 500);

    return () => clearTimeout(startTimer);
  });

  function animate() {
    const duration = 4000; // 4秒动画
    const startTime = performance.now();

    function frame(currentTime) {
      const elapsed = currentTime - startTime;
      progress = Math.min(1, elapsed / duration);

      if (progress < 1) {
        requestAnimationFrame(frame);
      }
    }

    requestAnimationFrame(frame);
  }
</script>

<div class="hero-container" bind:this={containerEl}>
  <!-- 天空背景 -->
  <div 
    class="sky"
    style:background="linear-gradient(to bottom, {skyColorTop} 0%, {skyColorBottom} 100%)"
  >
    <!-- 星星层 -->
    <div class="stars-layer" style:opacity={starsOpacity}>
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

  <!-- 海面 -->
  <div 
    class="sea"
    style:background={seaColor}
  >
    <!-- 波光效果 -->
    <div class="wave-reflection" style="opacity: {progress * 0.6}">
      <svg viewBox="0 0 200 40" preserveAspectRatio="none">
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color: transparent" />
            <stop offset="50%" style="stop-color: rgba(251, 191, 36, 0.4)" />
            <stop offset="100%" style="stop-color: transparent" />
          </linearGradient>
        </defs>
        <path 
          d="M0,20 Q25,15 50,20 T100,20 T150,20 T200,20 V40 H0 Z" 
          fill="url(#waveGradient)"
        />
      </svg>
    </div>

    <!-- 小船 -->
    <div 
      class="boat"
      style:opacity={boatOpacity}
    >
      <svg viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg">
        <!-- 船体 -->
        <path 
          d="M20,45 Q50,55 80,45 L75,55 Q50,62 25,55 Z" 
          fill="#0f172a"
        />
        <!-- 帆 -->
        <path 
          d="M50,45 L50,10 Q65,25 50,40 Z" 
          fill="#0f172a"
        />
        <!-- 桅杆 -->
        <line 
          x1="50" y1="45" x2="50" y2="8" 
          stroke="#0f172a" 
          stroke-width="2"
        />
      </svg>
    </div>
  </div>

  <!-- 内容层 -->
  <div class="content" style="opacity: {textOpacity}">
    <h1 class="title">Zevarc</h1>
    <p class="subtitle">从 Zero 开始，沿 Arc 演进</p>
    <p class="description">将复杂问题拆解为最简单的单元，逐步演进，直到找到答案</p>
    <button class="cta-button">
      探索我的演进历程
      <span class="arrow">→</span>
    </button>
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

  .sky {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 65%;
    transition: background 0.5s ease;
  }

  .stars-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
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

  .sun {
    position: absolute;
    transform: translate(-50%, -50%);
    transition: all 0.1s ease-out;
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

  .sea {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 35%;
    transition: background 0.5s ease;
  }

  .wave-reflection {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 40px;
    overflow: hidden;
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  .wave-reflection svg {
    width: 100%;
    height: 100%;
  }

  .boat {
    position: absolute;
    bottom: 15%;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 48px;
    animation: rock 4s ease-in-out infinite;
  }

  @keyframes rock {
    0%, 100% { transform: translateX(-50%) rotate(-2deg); }
    50% { transform: translateX(-50%) rotate(2deg); }
  }

  .content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: white;
    z-index: 10;
    padding: 0 20px;
    transition: opacity 0.5s ease;
  }

  .title {
    font-size: clamp(3rem, 8vw, 6rem);
    font-weight: 700;
    margin: 0;
    letter-spacing: 0.1em;
    text-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
    background: linear-gradient(135deg, #ffffff 0%, #7dd3fc 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .subtitle {
    font-size: clamp(1rem, 3vw, 1.5rem);
    margin: 1rem 0 0.5rem;
    opacity: 0.9;
    font-weight: 300;
    letter-spacing: 0.2em;
  }

  .description {
    font-size: clamp(0.875rem, 2vw, 1rem);
    margin: 0.5rem 0 2rem;
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

  .vignette {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(ellipse at center, transparent 40%, rgba(0, 0, 0, 0.4) 100%);
    pointer-events: none;
    z-index: 5;
  }

  /* 响应式调整 */
  @media (max-width: 768px) {
    .sea {
      height: 40%;
    }

    .boat {
      width: 60px;
      height: 36px;
      bottom: 20%;
    }

    .title {
      letter-spacing: 0.05em;
    }

    .subtitle {
      letter-spacing: 0.1em;
    }

    .cta-button {
      padding: 0.875rem 1.5rem;
      font-size: 0.875rem;
    }
  }

  /* 减少动画偏好 */
  @media (prefers-reduced-motion: reduce) {
    .star,
    .sun-glow,
    .boat {
      animation: none;
    }
  }
</style>
