<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import LanguageSwitcher from '$lib/components/LanguageSwitcher.svelte';
  import SectionHeader from '$lib/components/SectionHeader.svelte';
  import NavButton from '$lib/components/NavButton.svelte';
  import ProjectsList from '$lib/components/projects/Projects.svelte';
  import { Scene, SunsetBackground } from '$lib/components/visuals/index.js';
  import { getDictionary } from '$lib/i18n/index.js';

  const { lang = 'en' } = $props();

  let t = $derived(getDictionary(lang));
  let visible = $state(false);

  const nextPath = $derived(lang === 'zh' ? '/zh' : '/');

  onMount(() => {
    const timer = setTimeout(() => {
      visible = true;
    }, 120);

    return () => clearTimeout(timer);
  });

  function handleNext(event) {
    event.preventDefault();
    goto(nextPath);
  }
</script>

<svelte:head>
  <title>{t.seo.projects.title}</title>
  <meta name="description" content={t.seo.projects.description} />
  <link rel="alternate" hreflang="en" href="https://zevarc.com/projects" />
  <link rel="alternate" hreflang="zh-Hans" href="https://zevarc.com/zh/projects" />
</svelte:head>

<div class="page">
  <LanguageSwitcher />

  <Scene
    backgroundComponent={SunsetBackground}
    waveProps={{ theme: 'harbor', shimmer: true, shimmerOpacity: 0.35 }}
    boatProps={{ theme: 'harbor', scale: 0.9, rock: true }}
    seaClass="sea-slot"
  >
    <div slot="sky-objects" class="sunset">
      <div class="sun"></div>
    </div>
  </Scene>

  <section class="content" class:visible={visible}>
    <SectionHeader station={t.projects.station} title={t.projects.title} subtitle={t.projects.subtitle} />

    <ProjectsList projects={t.projects.projects} />

    <div class="navigation-section">
      <NavButton href={nextPath} label={t.projects.next} onClick={handleNext} />
    </div>
  </section>
</div>

<style>
  .page {
    position: relative;
    width: 100%;
    min-height: 100vh;
    overflow: hidden;
  }

  .content {
    position: relative;
    z-index: 10;
    max-width: 960px;
    margin: 0 auto;
    padding: 90px 24px 140px;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    color: #f8fafc;
  }

  .content.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .sunset {
    position: absolute;
    bottom: 20%;
    right: 20%;
    width: 80px;
    height: 80px;
  }

  .sun {
    width: 100%;
    height: 100%;
    box-shadow: rgba(253, 116, 108, 0.5) 0px 0px 60px;
    background: radial-gradient(
      circle,
      rgb(253, 116, 108) 0%,
      rgb(245, 158, 11) 50%,
      transparent 70%
    );
    border-radius: 50%;
  }

  .sea-slot {
    position: absolute;
    inset: 0;
  }

  .navigation-section {
    margin-top: 60px;
    text-align: center;
  }

  @media (max-width: 768px) {
    .content {
      padding: 80px 20px 100px;
    }
  }
</style>
