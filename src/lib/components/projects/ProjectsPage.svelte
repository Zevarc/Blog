<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import LanguageSwitcher from '$lib/components/LanguageSwitcher.svelte';
  import SectionHeader from '$lib/components/SectionHeader.svelte';
  import NavButton from '$lib/components/NavButton.svelte';
  import ProjectsList from '$lib/components/Projects.svelte';
  import { Scene, SunsetBackground } from '$lib/components/visuals/index.js';
  import { getDictionary } from '$lib/i18n/index.js';

  const { lang = 'en' } = $props();

  let t = $derived(getDictionary(lang));
  let visible = $state(false);

  const projects = [
    {
      id: 1,
      title: '智能任务管理系统',
      year: '2024',
      problem: '团队协作效率低下，任务分配混乱，无法追踪项目进度',
      decomposition: [
        '将「任务管理」拆解为：创建、分配、执行、验收、归档',
        '识别核心实体：任务、用户、团队、项目',
        '设计状态流转图：待处理 → 进行中 → 待验收 → 已完成'
      ],
      solution: '基于状态机的任务流转系统，支持自定义工作流',
      techStack: ['React', 'Node.js', 'PostgreSQL', 'WebSocket'],
      demoUrl: '#',
      sourceUrl: '#'
    },
    {
      id: 2,
      title: '数据可视化分析平台',
      year: '2023',
      problem: '海量业务数据无法直观理解，报表制作耗时，数据孤岛严重',
      decomposition: [
        '将「数据可视化」拆解为：数据源 → 清洗 → 聚合 → 渲染',
        '设计模块化图表组件：折线图、柱状图、饼图、地图',
        '建立数据管道：ETL → Data Warehouse → API Layer'
      ],
      solution: '拖拽式报表生成器，支持50+可视化组件',
      techStack: ['Vue.js', 'D3.js', 'Python', 'Airflow', 'Redshift'],
      demoUrl: '#',
      sourceUrl: '#'
    },
    {
      id: 3,
      title: '个人知识管理系统',
      year: '2023',
      problem: '学习资料散落各处，无法建立知识连接，检索效率低',
      decomposition: [
        '将「知识管理」拆解为：收集 → 整理 → 连接 → 输出',
        '设计双向链接机制：原子笔记 ↔ 主题笔记',
        '建立自动标签系统和智能推荐算法'
      ],
      solution: '支持双向链接的个人数字花园',
      techStack: ['Svelte', 'Electron', 'SQLite', 'Markdown'],
      demoUrl: '#',
      sourceUrl: '#'
    }
  ];

  const labels = $derived({
    problem: t.projects.problem || 'Problem',
    decomposition: lang === 'zh' ? '拆解' : 'Decomposition',
    solution: t.projects.solution || 'Solution',
    demo: lang === 'zh' ? '演示' : 'Demo',
    code: lang === 'zh' ? '代码' : 'Code'
  });

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

    <ProjectsList {projects} labels={labels} />

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
