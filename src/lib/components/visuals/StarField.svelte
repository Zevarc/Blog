<script>
  /**
   * StarField - 可复用的星空背景组件
   * @prop {number} count - 星星数量
   * @prop {number} opacity - 透明度 (0-1)
   * @prop {boolean} showShootingStars - 是否显示流星
   */
  
  let { 
    count = 50,
    opacity = 1,
    showShootingStars = false
  } = $props();
  
  // 生成星星数据
  const stars = Array.from({ length: count }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 70,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 2
  }));
</script>

<div class="star-field" style="opacity: {opacity}">
  <!-- 静态星星 -->
  {#each stars as star, i}
    <div 
      class="star"
      style="
        left: {star.x}%; 
        top: {star.y}%; 
        width: {star.size}px; 
        height: {star.size}px;
        animation-delay: {star.delay}s
      "
    ></div>
  {/each}
  
  <!-- 流星 -->
  {#if showShootingStars}
    <div class="shooting-stars">
      <div class="shooting-star"></div>
      <div class="shooting-star" style="animation-delay: 1.5s"></div>
    </div>
  {/if}
</div>

<style>
  .star-field {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
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
  
  /* Shooting Stars */
  .shooting-stars {
    position: absolute;
    top: 20%;
    right: 30%;
  }
  
  .shooting-star {
    position: absolute;
    width: 100px;
    height: 2px;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0.8) 0%, transparent 100%);
    animation: shoot 3s ease-in-out infinite;
  }
  
  .shooting-star:nth-child(2) {
    top: 30px;
    right: -50px;
    transform: rotate(-30deg);
  }
  
  @keyframes shoot {
    0% {
      transform: translateX(0) rotate(30deg);
      opacity: 1;
    }
    100% {
      transform: translateX(200px) rotate(30deg);
      opacity: 0;
    }
  }
  
  @media (prefers-reduced-motion: reduce) {
    .star {
      animation: none;
    }
    
    .shooting-star {
      animation: none;
    }
  }
</style>
