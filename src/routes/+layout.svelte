<script>
  import favicon from '$lib/assets/favicon.svg'
  import '../styles/main.css';
  
  const {children}=$props()
</script>

<svelte:head>
		<link rel="icon" href={favicon} type="image/svg+xml" />
</svelte:head>

{@render children()}