<script>
  /**
   * SailingBoat - 可复用的小船动画组件
   * @prop {number} scale - 缩放比例
   * @prop {string} theme - 主题颜色
   * @prop {boolean} animate - 是否播放驶入动画
   * @prop {number} animationDelay - 动画延迟 (ms)
   */
  
  let { 
    scale = 1,
    theme = 'sunrise',
    animate = false,
    animationDelay = 300
  } = $props();
  
  // 主题颜色映射
  const boatColors = {
    sunrise: '#0f172a',
    harbor: '#1e293b',
    sunset: '#1e293b',
    starry: '#1e293b'
  };
  
  let color = $derived(boatColors[theme] || boatColors.sunrise);
</script>

<div 
  class="boat-container"
  class:animate={animate}
  style="transform: scale({scale}); --boat-color: {color}"
>
  <svg class="boat" viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg">
    <path d="M20,45 Q50,55 80,45 L75,55 Q50,62 25,55 Z" fill="currentColor" class="boat-hull"/>
    <path d="M50,45 L50,10 Q65,25 50,40 Z" fill="currentColor" class="boat-sail"/>
    <line x1="50" y1="45" x2="50" y2="8" stroke="currentColor" stroke-width="2" class="boat-mast"/>
  </svg>
</div>

<style>
  .boat-container {
    position: absolute;
    bottom: 25%;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 48px;
    z-index: 10;
    transition: all 0.8s ease-in-out;
  }
  
  .boat-container.animate {
    animation: boat-sail-in 1.5s ease-out forwards;
    animation-delay: 300ms;
  }
  
  .boat {
    width: 100%;
    height: 100%;
    animation: rock 4s ease-in-out infinite;
    color: var(--boat-color, #0f172a);
  }
  
  .boat-hull,
  .boat-sail,
  .boat-mast {
    fill: currentColor;
    stroke: currentColor;
  }
  
  @keyframes rock {
    0%, 100% { transform: translateX(-50%) rotate(-2deg); }
    50% { transform: translateX(-50%) rotate(2deg); }
  }
  
  @keyframes boat-sail-in {
    0% {
      transform: translateX(-150%);
    }
    100% {
      transform: translateX(-50%);
    }
  }
  
  @media (max-width: 768px) {
    .boat-container {
      width: 60px;
      height: 36px;
      bottom: 30%;
    }
  }
  
  @media (prefers-reduced-motion: reduce) {
    .boat-container.animate {
      animation: none;
      transform: translateX(-50%);
    }
    
    .boat {
      animation: none;
    }
  }
</style>
