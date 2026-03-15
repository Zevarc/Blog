<script>
  /**
   * PageLayout - 页面布局组件
   * 统一处理页面结构、动画和过渡效果
   * @prop {string} theme - 主题名称
   * @prop {boolean} showBoat - 是否显示小船
   * @prop {boolean} contentVisible - 内容可见性（可绑定）
   */
  
  import { onMount } from 'svelte';
  import LanguageSwitcher from '$lib/components/LanguageSwitcher.svelte';
  import { ThemeBackground, WaveSystem, SailingBoat } from '$lib/components/visuals/index.js';
  
  let { 
    theme = 'sunrise',
    showBoat = true,
    contentVisible = $bindable(false),
    children
  } = $props();
  
  let internalVisible = $state(false);
  let boatPosition = $state(-100);
  let boatOpacity = $state(0);
  
  // 同步外部绑定的值
  $effect(() => {
    if (contentVisible) {
      internalVisible = true;
    }
  });
  
  onMount(() => {
    setTimeout(() => {
      internalVisible = true;
      contentVisible = true;
      if (showBoat) {
        animateBoatIn();
      }
    }, 300);
  });
  
  function animateBoatIn() {
    const startTime = performance.now();
    const duration = 1500;
    
    function frame(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / duration);
      
      const eased = 1 - Math.pow(1 - progress, 3);
      boatPosition = -100 + (150 * eased);
      boatOpacity = Math.max(0, Math.min(1, (progress - 0.5) * 3));
      
      if (progress < 1) {
        requestAnimationFrame(frame);
      }
    }
    
    requestAnimationFrame(frame);
  }
  
  // 暴露方法给父组件
  export function animateBoatOut() {
    return new Promise((resolve) => {
      boatPosition = 200;
      boatOpacity = 0;
      setTimeout(resolve, 800);
    });
  }
</script>

<div class="page-layout" data-theme={theme}>
  <!-- 主题背景 -->
  <ThemeBackground {theme}>
    <svelte:fragment slot="sea">
      <WaveSystem {theme} />
    </svelte:fragment>
  </ThemeBackground>
  
  <!-- 小船 -->
  {#if showBoat}
    <div 
      class="boat-wrapper"
      style="transform: translateX({boatPosition}%); opacity: {boatOpacity}"
    >
      <SailingBoat {theme} scale={1} />
    </div>
  {/if}
  
  <!-- 主内容 -->
  <main class="page-content" class:visible={internalVisible}>
    {@render children()}
  </main>
  
  <!-- 语言切换器 -->
  <LanguageSwitcher />
</div>

<style>
  .page-layout {
    position: relative;
    width: 100%;
    min-height: 100vh;
    overflow-x: hidden;
  }
  
  .boat-wrapper {
    position: absolute;
    bottom: 35%;
    left: 0;
    width: 100%;
    z-index: 10;
    transition: all 0.8s ease-in-out;
    pointer-events: none;
  }
  
  .page-content {
    position: relative;
    z-index: 20;
    min-height: 100vh;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease;
  }
  
  .page-content.visible {
    opacity: 1;
    transform: translateY(0);
  }
</style>
