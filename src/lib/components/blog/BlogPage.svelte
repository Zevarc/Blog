<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import LanguageSwitcher from '$lib/components/LanguageSwitcher.svelte';
  import SectionHeader from '$lib/components/SectionHeader.svelte';
  import NavButton from '$lib/components/NavButton.svelte';
  import BlogList from '$lib/components/blog/BlogList.svelte';
  import { Scene, HarborBackground, Moon } from '$lib/components/visuals/index.js';
  import { getDictionary } from '$lib/i18n/index.js';

  const { lang = 'en' } = $props();

  let t = $derived(getDictionary(lang));
  let visible = $state(false);

  const projectsPath = $derived(lang === 'zh' ? '/zh/projects' : '/projects');

  onMount(() => {
    const timer = setTimeout(() => {
      visible = true;
    }, 120);

    return () => clearTimeout(timer);
  });

  function handleNext(event) {
    event.preventDefault();
    goto(projectsPath);
  }
</script>

<svelte:head>
  <title>{t.seo.blog.title}</title>
  <meta name="description" content={t.seo.blog.description} />
  <link rel="alternate" hreflang="en" href="https://zevarc.com/blog" />
  <link rel="alternate" hreflang="zh-Hans" href="https://zevarc.com/zh/blog" />
</svelte:head>

<div class="page">
  <LanguageSwitcher />

  <Scene
    backgroundComponent={HarborBackground}
    backgroundProps={{ showStarField: true, seaGradient: 'linear-gradient(to bottom, #1e3a5f, #0c1929)' }}
    waveProps={{ theme: 'harbor', shimmer: true, shimmerOpacity: 0.35 }}
    boatProps={{ theme: 'harbor', scale: 0.9, rock: true }}
    seaClass="sea-slot"
  >
    <Moon slot="sky-objects" />
  </Scene>

  <main class="content" class:visible={visible}>
    <SectionHeader station={t.blog.station} title={t.blog.title} subtitle={t.blog.subtitle} />

    <BlogList posts={t.blog.posts} readMoreLabel={t.blog.readMore} />

    <div class="navigation-section">
      <NavButton href={projectsPath} label={t.blog.next} onClick={handleNext} />
    </div>
  </main>
</div>

<style>
  .page {
    position: relative;
    width: 100%;
    min-height: 100vh;
    overflow: hidden;
    font-family:
      "Inter",
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      Roboto,
      sans-serif;
    background: linear-gradient(to bottom, #0f172a, #1e3a5f, #0c1929);
  }

  .sea-slot {
    position: absolute;
    inset: 0;
  }

  .content {
    position: relative;
    z-index: 10;
    max-width: 800px;
    margin: 0 auto;
    padding: 80px 24px 120px;
    opacity: 0;
    transform: translateY(30px);
    transition: all .8s cubic-bezier(.16, 1, .3, 1);
  }

  .content.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .navigation-section {
    margin-top: 60px;
    text-align: center;
  }

  @media (max-width: 768px) {
    .content {
      padding: 80px 20px 40px;
    }
  }
</style>
