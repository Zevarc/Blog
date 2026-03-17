// 中文字典
export const zh = {
  nav: {
    home: '首页',
    blog: '博客',
    projects: '项目',
    language: 'English'
  },
  hero: {
    title: 'Zevarc',
    phonetic: '/ˈziː.vɑːrk/',
    etymology: {
      zero: 'Zero（零）',
      evolution: 'Evolution（演进）',
      arc: 'Arc（弧线）'
    },
    slogan: '从0开始，曲折演进，收获成长和快乐',
    description: '分享 Android、C++、Python、前端及浏览器插件等技术的好地方。',
    topics: ['Android', 'C++', 'Python', '前端', '浏览器插件'],
    cta: '探索我的演进历程'
  },
  blog: {
    station: '第一站',
    title: '知识的港湾',
    subtitle: '在这里停泊，补充能量',
    readMore: '阅读全文 →',
    next: '前往码头',
    posts: [
      {
        id: 1,
        title: 'Hello World：Zevarc 的诞生',
        date: '2024-03-01',
        excerpt: '为什么要打造以“演进”为核心的个人品牌？这篇文章讲述 Zevarc 的诞生和核心理念。',
        url: '#',
        tags: ['Android', 'C++', 'Python', '前端']
      },
      {
        id: 2,
        title: '问题拆解的艺术：从复杂到简单',
        date: '2024-03-10',
        excerpt: '面对复杂问题，如何拆解为可解的小块？分享我常用的拆解思路。',
        url: '#',
        tags: ['思维', '方法论', '问题解决']
      },
      {
        id: 3,
        title: '这个网站怎么搭的：技术选型与日出动画',
        date: '2024-03-15',
        excerpt: '总结从零搭建个人网站的过程，包括 Svelte 5 的体验和日出动画的实现。',
        url: '#',
        tags: ['Svelte', 'Web', '笔记']
      }
    ]
  },
  projects: {
    station: '第二站',
    title: '成果的码头',
    subtitle: '在这里装载，出发远方',
    problem: '问题',
    solution: '方案',
    next: '了解更多',
    projects: [{
      "id": 1,
      "title": "快传",
      "year": "2017",
      "description": "在无网络的情况下快速传输文件的Android应用",
      "image": "/projects/fastair.png",
      "tags": [
        "Android",
        "WIFI P2P"
      ],
      "link": "https://github.com/zevarc/fastair",
    }
    ]
  },
  about: {
    title: '关于 Zevarc',
    intro: 'Zevarc 不仅仅是一个名字，它是解决问题的方法论。',
    methodology: '方法论',
    steps: {
      decompose: '拆解',
      decomposeDesc: '将复杂问题分解为最小单元',
      analyze: '分析',
      analyzeDesc: '理解每个单元的本质',
      evolve: '演进',
      evolveDesc: '逐步构建解决方案',
      integrate: '整合',
      integrateDesc: '将各部分有机结合'
    },
    skills: '技能栈',
    categories: {
      frontend: '前端开发',
      backend: '后端开发',
      tools: '工具&其他'
    },
    timeline: '历程',
    backToHome: '返回起点'
  },
  footer: {
    title: '让我们一起演进',
    subtitle: '如果你对问题拆解的方法论感兴趣，欢迎随时联系。',
    contact: '联系我'
  },
  seo: {
    home: {
      title: 'Zevarc - 从Zero开始的曲折演进之路',
      description: 'Zevarc 是关于问题拆解和逐步演进 的个人品牌。分享 Android、C++、Python、前端及浏览器插件等技术。'
    },
    blog: {
      title: '博客 - Zevarc',
      description: '关于 Android、C++、Python、前端开发等技术文章和见解。'
    },
    projects: {
      title: '项目 - Zevarc',
      description: '使用问题拆解方法论构建的项目展示。'
    },
    about: {
      title: '关于 - Zevarc',
      description: '了解 Zevarc 的方法论和演进历程。'
    }
  }
};

export default zh;
