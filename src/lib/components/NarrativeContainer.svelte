<script>
  import { onMount } from 'svelte';

  // 滚动进度状态
  let scrollProgress = $state(0);
  let containerEl;
  
  // 场景状态
  let currentScene = $state('hero'); // hero, harbor, dock
  
  // 小船位置（基于Arc曲线）
  let boatPos = $state({ x: 50, y: 65, rotation: 0, scale: 1, opacity: 1 });
  
  // 背景颜色
  let skyTop = $state('#020617');
  let skyBottom = $state('#0f172a');
  let seaColor = $state('#000000');
  
  // 元素可见性
  let starsVisible = $state(true);
  let sunVisible = $state(false);
  let sunY = $state(100);
  let lighthouseVisible = $state(false);
  let harborLightsVisible = $state(false);
  let cranesVisible = $state(false);
  let pilingsVisible = $state(false);

  // 计算场景和位置
  function updateScene() {
    if (!containerEl) return;
    
    const rect = containerEl.getBoundingClientRect();
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.max(0, Math.min(1, -rect.top / docHeight));
    scrollProgress = progress;
    
    // 根据滚动位置确定场景和属性
    if (progress < 0.33) {
      // Hero场景：日出
      currentScene = 'hero';
      const p = progress / 0.33;
      
      // 天空：从黑夜到日出
      skyTop = interpolateColor('#020617', '#1e3a5f', p);
      skyBottom = interpolateColor('#0f172a', '#7dd3fc', p);
      seaColor = interpolateColor('#000000', '#0369a1', p);
      
      // 星星：逐渐消失
      starsVisible = p < 0.5;
      
      // 太阳：升起
      sunVisible = p > 0.2;
      sunY = 80 - p * 60;
      
      // 小船：从显现到启航
      boatPos = {
        x: 50,
        y: 65 - p * 5,
        rotation: Math.sin(Date.now() / 1000) * 2,
        scale: 1,
        opacity: 1
      };
      
    } else if (progress < 0.66) {
      // Harbor场景：港湾
      currentScene = 'harbor';
      const p = (progress - 0.33) / 0.33;
      
      // 港湾颜色
      skyTop = interpolateColor('#1e3a5f', '#134e4a', p);
      skyBottom = interpolateColor('#7dd3fc', '#0d9488', p);
      seaColor = interpolateColor('#0369a1', '#115e59', p);
      
      // 星星已消失
      starsVisible = false;
      sunVisible = false;
      
      // 港湾元素显现
      lighthouseVisible = p > 0.2;
      harborLightsVisible = p > 0.4;
      
      // 小船：沿弧线驶入港湾
      boatPos = {
        x: 50 - p * 15,
        y: 60 - p * 10,
        rotation: -10 + p * 5,
        scale: 1 - p * 0.1,
        opacity: 1
      };
      
    } else {
      // Dock场景：码头
      currentScene = 'dock';
      const p = (progress - 0.66) / 0.34;
      
      // 码头颜色
      skyTop = interpolateColor('#134e4a', '#1e293b', p);
      skyBottom = interpolateColor('#0d9488', '#475569', p);
      seaColor = interpolateColor('#115e59', '#334155', p);
      
      // 港湾元素
      lighthouseVisible = true;
      harborLightsVisible = true;
      
      // 码头元素显现
      cranesVisible = p > 0.2;
      pilingsVisible = p > 0.3;
      
      // 小船：沿弧线驶向码头，更加曲折
      boatPos = {
        x: 35 + p * 30,
        y: 50 - p * 20,
        rotation: -5 + Math.sin(p * Math.PI * 2) * 8,
        scale: 0.9 - p * 0.3,
        opacity: 1 - p * 0.3
      };
    }
  }

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

  onMount(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    const handleScroll = () => {
      updateScene();
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScene();
    
    return () => window.removeEventListener('scroll', handleScroll);
  });
</script>

<div class="scene-container" bind:this={containerEl}>
  <!-- 动态背景 -->
  <div 
    class="sky"
    style:background="linear-gradient(to bottom, {skyTop} 0%, {skyBottom} 100%)"
  >
    <!-- 星星层（仅Hero） -->
    {#if starsVisible}
      <div class="stars">
        {#each Array(40) as _, i}
          <div 
            class="star"
            style="left: {Math.random() * 100}%; top: {Math.random() * 50}%; animation-delay: {Math.random() * 2}s"
          ></div>
        {/each}
      </div>
    {/if}
    
    <!-- 太阳（仅Hero） -->
    {#if sunVisible}
      <div class="sun" style="top: {sunY}%">
        <div class="sun-core"></div>
        <div class="sun-glow"></div>
      </div>
    {/if}
    
    <!-- 灯塔（仅Harbor） -->
    {#if lighthouseVisible}
      <div class="lighthouse">
        <svg viewBox="0 0 100 200">
          <rect x="40" y="80" width="20" height="120" fill="#1a1a2e"/>
          <polygon points="50,20 25,80 75,80" fill="#1a1a2e"/>
          <circle cx="50" cy="50" r="12" fill="#fbbf24" class="light-beam"/>
        </svg>
      </div>
    {/if}
    
    <!-- 港湾灯光（仅Harbor） -->
    {#if harborLightsVisible}
      <div class="harbor-lights">
        <div class="light-window" style="left: 20%; top: 30%"></div>
        <div class="light-window" style="left: 25%; top: 40%"></div>
        <div class="light-window" style="left: 18%; top: 50%"></div>
      </div>
    {/if}
    
    <!-- 吊车（仅Dock） -->
    {#if cranesVisible}
      <div class="cranes">
        <svg class="crane" viewBox="0 0 80 200" style="left: 15%">
          <rect x="35" y="50" width="10" height="150" fill="#374151"/>
          <rect x="20" y="60" width="40" height="5" fill="#4b5563"/>
          <rect x="20" y="60" width="5" height="30" fill="#6b7280"/>
        </svg>
        <svg class="crane" viewBox="0 0 80 200" style="left: 70%">
          <rect x="35" y="30" width="10" height="170" fill="#374151"/>
          <rect x="15" y="40" width="50" height="5" fill="#4b5563"/>
          <rect x="15" y="40" width="5" height="25" fill="#6b7280"/>
        </svg>
      </div>
    {/if}
  </div>
  
  <!-- 海面 -->
  <div class="sea" style:background={seaColor}>
    <!-- 波浪 -->
    <div class="waves">
      <div class="wave wave-1"></div>
      <div class="wave wave-2"></div>
    </div>
    
    <!-- 木桩（仅Dock） -->
    {#if pilingsVisible}
      <div class="pilings">
        <div class="piling" style="left: 20%"></div>
        <div class="piling" style="left: 35%"></div>
        <div class="piling" style="left: 50%"></div>
        <div class="piling" style="left: 65%"></div>
      </div>
    {/if}
  </div>
  
  <!-- 小船 -->
  <div 
    class="boat"
    style="
      left: {boatPos.x}%; 
      top: {boatPos.y}%; 
      transform: translate(-50%, -50%) rotate({boatPos.rotation}deg) scale({boatPos.scale});
      opacity: {boatPos.opacity};
    "
  >
    <svg viewBox="0 0 100 60" class="boat-svg">
      <path d="M15,40 Q50,55 85,40 L78,52 Q50,60 22,52 Z" fill="#0f172a"/>
      <path d="M50,40 L50,5 Q68,22 50,35 Z" fill="#0f172a"/>
      <line x1="50" y1="40" x2="50" y2="3" stroke="#0f172a" stroke-width="2"/>
    </svg>
  </div>
  
  <!-- 内容层 -->
  <div class="content-wrapper">
    <slot />
  </div>
  
  <!-- 滚动提示 -->
  <div class="scroll-hint" class:hidden={scrollProgress > 0.05}>
    <span>向下滚动开始旅程</span>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 5v14M5 12l7 7 7-7"/>
    </svg>
  </div>
</div>

<style>
  .scene-container {
    position: relative;
    min-height: 400vh;
    overflow: hidden;
  }
  
  /* 天空 */
  .sky {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 0;
    transition: background 0.5s ease;
  }
  
  /* 星星 */
  .stars {
    position: absolute;
    width: 100%;
    height: 60%;
  }
  
  .star {
    position: absolute;
    width: 2px;
    height: 2px;
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
    left: 50%;
    transform: translateX(-50%);
    transition: top 0.3s ease;
  }
  
  .sun-core {
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #fef3c7, #fbbf24);
    border-radius: 50%;
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
  }
  
  /* 灯塔 */
  .lighthouse {
    position: absolute;
    bottom: 35%;
    left: 8%;
    width: 50px;
    height: 100px;
  }
  
  .light-beam {
    animation: beam-rotate 4s ease-in-out infinite;
  }
  
  @keyframes beam-rotate {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 1; }
  }
  
  /* 港湾灯光 */
  .harbor-lights {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  
  .light-window {
    position: absolute;
    width: 15px;
    height: 20px;
    background: #fbbf24;
    border-radius: 2px;
    box-shadow: 0 0 20px #fbbf24, 0 0 40px rgba(251, 191, 36, 0.5);
    animation: window-glow 3s ease-in-out infinite;
  }
  
  .light-window:nth-child(2) { animation-delay: 0.5s; }
  .light-window:nth-child(3) { animation-delay: 1s; }
  
  @keyframes window-glow {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 1; }
  }
  
  /* 吊车 */
  .cranes {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  
  .crane {
    position: absolute;
    bottom: 35%;
    width: 60px;
    height: 150px;
  }
  
  /* 海面 */
  .sea {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 35vh;
    z-index: 1;
    transition: background 0.5s ease;
  }
  
  .waves {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  
  .wave {
    position: absolute;
    width: 200%;
    height: 100%;
    background: repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(56, 189, 248, 0.1) 50px, rgba(56, 189, 248, 0.1) 100px);
    animation: wave-drift 20s linear infinite;
  }
  
  .wave-2 {
    opacity: 0.5;
    animation-duration: 15s;
  }
  
  @keyframes wave-drift {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }
  
  /* 木桩 */
  .pilings {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  
  .piling {
    position: absolute;
    bottom: 0;
    width: 8px;
    height: 40%;
    background: linear-gradient(to top, #374151, #1f2937);
    border-radius: 4px 4px 0 0;
  }
  
  /* 小船 */
  .boat {
    position: fixed;
    z-index: 10;
    transition: all 0.15s ease-out;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
  }
  
  .boat-svg {
    width: 70px;
    height: 42px;
    animation: boat-rock 3s ease-in-out infinite;
  }
  
  @keyframes boat-rock {
    0%, 100% { transform: rotate(-2deg); }
    50% { transform: rotate(2deg); }
  }
  
  /* 内容层 */
  .content-wrapper {
    position: relative;
    z-index: 50;
  }
  
  /* 滚动提示 */
  .scroll-hint {
    position: fixed;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 100;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.8rem;
    transition: opacity 0.5s ease;
  }
  
  .scroll-hint.hidden {
    opacity: 0;
  }
  
  .scroll-hint svg {
    animation: bounce 2s ease-in-out infinite;
  }
  
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(8px); }
  }
  
  /* 响应式 */
  @media (max-width: 768px) {
    .lighthouse {
      width: 35px;
      height: 70px;
      left: 5%;
    }
    
    .crane {
      width: 40px;
      height: 100px;
    }
    
    .boat-svg {
      width: 50px;
      height: 30px;
    }
    
    .scroll-hint {
      font-size: 0.7rem;
    }
  }
  
  /* 减少动画 */
  @media (prefers-reduced-motion: reduce) {
    .star, .sun-glow, .wave, .boat-svg, .light-beam, .light-window, .scroll-hint svg {
      animation: none;
    }
  }
</style>
