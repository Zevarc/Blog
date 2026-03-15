<script>
  import Star from "$lib/components/visuals/StarField.svelte";
  import WaveSystem from "$lib/components/visuals/WaveSystem.svelte";
  import ThemeBackground from "$lib/components/visuals/ThemeBackground.svelte";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import LanguageSwitcher from "$lib/components/LanguageSwitcher.svelte";
  import { getDictionary } from "$lib/i18n/index.js";
  import StarField from "$lib/components/visuals/StarField.svelte";

  let currentLang = $derived(
    $page.url.pathname.startsWith("/zh") ? "zh" : "en",
  );
  let t = $derived(getDictionary(currentLang));

  let visible = $state(false);

  onMount(() => {
    setTimeout(() => {
      visible = true;
    }, 100);
  });

  function handleNext(event) {
    event.preventDefault();
    const projectsPath = currentLang === "zh" ? "/zh/projects" : "/projects";
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
  <div class="harbor-bg">
    <div class="night-sky">
      <div class="stars">
        <StarField />
      </div>
      <div class="moon">
        <div class="moon-face" />
      </div>
    </div>
    <div class="horizon-blend"></div>
    <div class="sea">
      <WaveSystem />
    </div>
  </div>
  <main class="content" class:visible>
    <div class="section-header">
      <span class="station-label">{t.blog.station}</span>
      <h1 class="title">{t.blog.title}</h1>
      <p class="subtitle">{t.blog.subtitle}</p>
    </div>

    <div class="posts-container">
      {#each t.blog.posts as post, i}
        <article class="post-card" style="animation-delay: {0.1 + i * 0.1}s">
          <span class="post-date">{post.date}</span>
          <h2 class="post-title">{post.title}</h2>
          <p class="post-excerpt">{post.excerpt}</p>
          <div class="post-tags">
            {#each post.tags as tag}
              <span class="tag">{tag}</span>
            {/each}
          </div>
          <a class="read-more" href="{post.url}">Read More</a>
        </article>
      {/each}
    </div>

    <div class="navigation-section">
      <a href="/projects" class="nav-link" onclick={handleNext}>
        {t.blog.next}
        <svg
          class="arrow"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </a>
    </div>
  </main>
</div>

<style>
  .page {
    position: relative;
    width: 100%;
    min-height: 100vh;
    background: linear-gradient(to bottom, #0f172a, #1e3a5f, #0c1929);
    overflow: hidden;
    font-family:
      "Inter",
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      Roboto,
      sans-serif;
  }

  .harbor-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  .night-sky {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 55%;
    background: linear-gradient(to bottom, #0f172a, #1e293b);
  }

  .stars {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .moon {
    position: absolute;
    top: 10%;
    right: 15%;
    width: 60px;
    height: 60px;
  }

  .moon-face {
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle at 30% 30%,
      #fef3c7 0%,
      #fde68a 50%,
      transparent 70%
    );
    border-radius: 50%;
    box-shadow:
      0 0 40px #fef3c74d,
      0 0 80px #fef3c726;
  }

  .horizon-blend {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 15%;
    background: linear-gradient(
      to bottom,
      #0f172a00,
      #0f172a4d,
      #1e3a5f80 60%,
      #1e3a5fcc
    );
    filter: blur(10px);
    z-index: 2;
  }

  .sea {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50%;
    background: linear-gradient(to bottom, #1e3a5f, #0c1929);
    overflow: hidden;
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

  .section-header {
    margin-bottom: 60px;
    text-align: center;
  }

  .station-label {
    display: inline-block;
    padding: 8px 20px;
    background: #fbbf2426;
    border: 1px solid rgba(251, 191, 36, .3);
    border-radius: 20px;
    color: #fbbf24;
    font-size: .875rem;
    letter-spacing: .1em;
    margin-bottom: 20px;
  }

  .title {
    font-size: clamp(2.5rem, 6vw, 4rem);
    font-weight: 700;
    color: #f8fafc;
    margin: 0 0 16px;
    letter-spacing: .05em;
  }

  .subtitle {
    font-size: 1.25rem;
    color: #94a3b8;
    margin: 0;
    font-weight: 300;
  }

  .posts-container {
        display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .post-card {
    background: #1e293b99;
    border: 1px solid rgba(148, 163, 184, .1);
    border-radius: 16px;
    padding: 32px;
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    opacity: 0;
    transform: translateY(20px);
    animation: svelte-u4k2t-fadeInUp .6s ease forwards;
  }

  .post-card:hover {
    border-color: #ddd;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .post-date {
    display: block;
    font-size: .875rem;
    color: #fbbf24;
    margin-bottom: 12px;
    font-family: JetBrains Mono, monospace;
  }

  .post-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #f1f5f9;
    margin: 0 0 12px;
  }

  .post-excerpt {
    font-size: 1rem;
    color: #94a3b8;
    margin: 0 0 20px;
    line-height: 1.6;
  }

  .post-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .tag {
    padding: 4px 12px;
    background: #f5f5f5;
    border-radius: 14px;
    font-size: 0.75rem;
    color: #555;
    font-weight: 500;
  }

  .read-more{
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: #38bdf8;
    text-decoration: none;
    font-weight: 500;
    transition: gap .3s ease;
  }

  .navigation-section {
    margin-top: 60px;
    text-align: center;
  }

  .nav-link {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    padding: 16px 32px;
    background: linear-gradient(135deg, #fbbf24, #f59e0b);
    color: #0f172a;
    text-decoration: none;
    font-weight: 600;
    font-size: 1.125rem;
    border-radius: 50px;
    transition: all .3s ease;
    box-shadow: 0 4px 20px #fbbf244d;
  }

  .nav-link:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px #fbbf2480;
  }

  .arrow {
    width: 20px;
    height: 20px;
  }

  .footer {
    position: absolute;
    bottom: 24px;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 0.875rem;
    color: #999;
  }

  @media (max-width: 768px) {
    .title {
      font-size: 2rem;
    }

    .content {
      padding: 80px 20px 40px;
    }

    .post-card {
      padding: 20px;
    }
  }
</style>
