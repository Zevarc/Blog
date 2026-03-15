<script>
  /**
   * CelestialBody - 可复用的天体组件（太阳/月亮）
   * @prop {string} type - 天体类型: 'sun' | 'moon'
   * @prop {number} x - 水平位置 (百分比)
   * @prop {number} y - 垂直位置 (百分比)
   * @prop {number} opacity - 透明度 (0-1)
   * @prop {boolean} animated - 是否播放动画
   */
  
  let { 
    type = 'sun',
    x = 50,
    y = 50,
    opacity = 1,
    animated = true
  } = $props();
  
  // 颜色配置
  const colors = {
    sun: {
      core: 'linear-gradient(135deg, #fef3c7, #fbbf24)',
      glow: 'rgba(251, 191, 36, 0.4)'
    },
    moon: {
      core: 'linear-gradient(135deg, #f0f9ff, #bae6fd)',
      glow: 'rgba(186, 230, 253, 0.3)'
    }
  };
  
  let colorSet = $derived(colors[type] || colors.sun);
</script>

{#if type === 'sun'}
  <div 
    class="celestial sun"
    style="left: {x}%; top: {y}%; opacity: {opacity}"
  >
    <div class="celestial-core" style="background: {colorSet.core}"></div>
    <div 
      class="celestial-glow" 
      style="background: radial-gradient(circle, {colorSet.glow} 0%, transparent 70%)"
      class:animated={animated}
    ></div>
  </div>
{:else}
  <div 
    class="celestial moon"
    style="left: {x}%; top: {y}%; opacity: {opacity}"
  >
    <div class="celestial-core" style="background: {colorSet.core}"></div>
    <div 
      class="celestial-glow" 
      style="background: radial-gradient(circle, {colorSet.glow} 0%, transparent 70%)"
      class:animated={animated}
    ></div>
  </div>
{/if}

<style>
  .celestial {
    position: absolute;
    transform: translate(-50%, -50%);
    transition: all 0.3s ease-out;
  }
  
  /* Sun specific */
  .sun .celestial-core {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    position: relative;
    z-index: 2;
  }
  
  .sun .celestial-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 120px;
    height: 120px;
    border-radius: 50%;
    z-index: 1;
  }
  
  /* Moon specific */
  .moon .celestial-core {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    position: relative;
    z-index: 2;
    box-shadow: 0 0 40px rgba(186, 230, 253, 0.5);
  }
  
  .moon .celestial-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80px;
    height: 80px;
    border-radius: 50%;
    z-index: 1;
  }
  
  /* Animations */
  .celestial-glow.animated {
    animation: pulse 3s ease-in-out infinite;
  }
  
  @keyframes pulse {
    0%, 100% { 
      transform: translate(-50%, -50%) scale(1); 
      opacity: 0.6; 
    }
    50% { 
      transform: translate(-50%, -50%) scale(1.1); 
      opacity: 0.8; 
    }
  }
  
  @media (prefers-reduced-motion: reduce) {
    .celestial-glow.animated {
      animation: none;
    }
  }
</style>
