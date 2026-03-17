<script>
  import { onNavigate } from '$app/navigation';
  import favicon from '$lib/assets/favicon.svg'
  import '../styles/main.css';
  
  // 页面过渡动画
  onNavigate((navigation) => {
    if (!document.startViewTransition) return;
    
    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
  });
</script>

<svelte:head>
		<link rel="icon" href={favicon} type="image/svg+xml" />
</svelte:head>

<style>
  /* 页面过渡 */
  :global(::view-transition-old(root)) {
    animation: 0.4s ease-in-out both fade-out;
  }
  
  :global(::view-transition-new(root)) {
    animation: 0.4s ease-in-out both fade-in;
  }
  
  @keyframes fade-out {
    from { opacity: 1; transform: translateX(0); }
    to { opacity: 0; transform: translateX(-30px); }
  }
  
  @keyframes fade-in {
    from { opacity: 0; transform: translateX(30px); }
    to { opacity: 1; transform: translateX(0); }
  }
</style>
