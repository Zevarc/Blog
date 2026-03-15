<script>
  /**
   * ThemeBackground - 主题背景组件
   * 整合天空、天体、星星等背景元素
   * @prop {string} theme - 主题: 'sunrise' | 'harbor' | 'sunset' | 'starry'
   * @prop {number} progress - 日出动画进度 (0-1)
   */
  
  import CelestialBody from './CelestialBody.svelte';
  import StarField from './StarField.svelte';
  
  let { 
    theme = 'sunrise',
    progress = 1
  } = $props();
  
  // 主题背景颜色
  const themeColors = {
    sunrise: {
      sky: 'linear-gradient(to bottom, #020617 0%, #0f172a 100%)',
      sea: 'linear-gradient(to bottom, #000814 0%, #001219 100%)'
    },
    harbor: {
      sky: 'linear-gradient(to bottom, #0f172a 0%, #1e293b 100%)',
      sea: 'linear-gradient(to bottom, #1e293b 0%, #0f172a 100%)'
    },
    sunset: {
      sky: 'linear-gradient(to bottom, #1e293b 0%, #7c2d12 50%, #c2410c 100%)',
      sea: 'linear-gradient(to bottom, #1e293b 0%, #0f172a 100%)'
    },
    starry: {
      sky: 'linear-gradient(to bottom, #020617 0%, #0f172a 60%, #1e293b 100%)',
      sea: 'linear-gradient(to bottom, #0f172a 0%, #020617 100%)'
    }
  };
  
  let skyGradient = $derived(themeColors[theme]?.sky || themeColors.sunrise.sky);
  let seaGradient = $derived(themeColors[theme]?.sea || themeColors.sunrise.sea);
  
  // 计算太阳位置（仅 sunrise 主题）
  let sunOpacity = $derived(theme === 'sunrise' ? Math.max(0, Math.min(1, (progress - 0.1) * 2)) : 0);
  let sunX = $derived(50 + Math.sin(progress * Math.PI) * 35);
  let sunY = $derived(85 - progress * 65);
  let starsOpacity = $derived(theme === 'sunrise' ? Math.max(0, 1 - progress * 1.5) : 0);
</script>

<div class="theme-background" data-theme={theme}>
  <!-- 天空层 -->
  <div class="sky" style="background: {skyGradient}">
    <!-- 星星层 (sunrise 淡出, starry 常亮) -->
    {#if theme === 'sunrise'}
      <div class="stars-layer" style="opacity: {starsOpacity}">
        <StarField count={50} opacity={starsOpacity} />
      </div>
    {:else if theme === 'starry'}
      <StarField count={80} showShootingStars={true} />
    {/if}
    
    <!-- 太阳 (sunrise) -->
    {#if theme === 'sunrise'}
      <CelestialBody 
        type="sun" 
        x={sunX} 
        y={sunY} 
        opacity={sunOpacity}
      />
    {/if}
    
    <!-- 月亮 (harbor) -->
    {#if theme === 'harbor'}
      <CelestialBody type="moon" x={85} y={20} />
    {/if}
    
    <!-- 夕阳 (sunset) -->
    {#if theme === 'sunset'}
      <CelestialBody type="sun" x={50} y={80} />
    {/if}
  </div>
  
  <!-- 地平线过渡层 -->
  <div class="horizon-blend"></div>
  
  <!-- 海洋层 -->
  <div class="sea" style="background: {seaGradient}">
    <slot name="sea" />
  </div>
  
  <!-- 暗角效果 -->
  <div class="vignette"></div>
</div>

<style>
  .theme-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
  
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
  
  .sea {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 45%;
    transition: background 1.5s ease;
    overflow: hidden;
  }
  
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
  
  /* Theme-specific adjustments */
  [data-theme="sunset"] .horizon-blend {
    background: linear-gradient(
      to bottom,
      rgba(124, 45, 18, 0) 0%,
      rgba(124, 45, 18, 0.3) 30%,
      rgba(30, 41, 59, 0.5) 60%,
      rgba(30, 41, 59, 0.8) 100%
    );
  }
  
  [data-theme="starry"] .horizon-blend {
    background: linear-gradient(
      to bottom,
      rgba(15, 23, 42, 0) 0%,
      rgba(15, 23, 42, 0.3) 30%,
      rgba(15, 23, 42, 0.5) 60%,
      rgba(15, 23, 42, 0.8) 100%
    );
  }
</style>
