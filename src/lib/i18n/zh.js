// 中文字典
export const zh = {
  language: 'English',
  hero: {
    title: 'Zevarc',
    phonetic: '/ˈziː.vɑːrk/',
    etymology: {
      zero: 'Zero（零）',
      evolution: 'Evolution（演进）',
      arc: 'Arc（弧线）'
    },
    slogan: '从0开始，曲折演进，收获成长和快乐',
    description: '一个分享Android、C++、Python、前端及浏览器插件等技术的好地方。',
    topics: ['Android', 'C++', 'Python', '前端', '浏览器插件'],
    cta: '探索'
  },
  posts: {
    station: '第一站',
    title: '知识的港湾',
    subtitle: '想法在这里停靠，思维在这里沉淀',
    blogTitle: '博客',
    blogSubtitle: '一个话题从本质，到拆解，直至解决的完整记录',
    noteTitle: '笔记',
    noteSubtitle: '所见，所思，所想的片段',
    readMore: '阅读全文 →',
    next: '前往码头',
  },
  projects: {
    station: '第二站',
    title: '成果的码头',
    subtitle: '在这里装载，出发远方',
    next: '回航',
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
    },
    {
      id: 2,
      title: 'GitHit',
      year: '2026',
      description: '随机探索和发现Github仓库和开发者',
      image: '/projects/fastair.png',
      tags: [
        'GitHub',
        'GitHit'
      ],
      website: 'https://githit.zevarc.com'
    }
    ]
  },
  footer: {
    title: '进步使我快乐',
    subtitle: '如果你对问题拆解的方法论感兴趣，欢迎随时联系。',
    contact: '联系我'
  },
  seo: {
    home: {
      title: 'Zevarc - 从0开始的曲折演进之路',
      description: 'Zevarc 是关于问题拆解和逐步演进 的个人品牌。分享 Android、C++、Python、前端及浏览器插件等技术。'
    },
    posts: {
      title: '博客 - Zevarc',
      description: '关于 Android、C++、Python、前端开发等技术文章和见解。'
    },
    projects: {
      title: '项目 - Zevarc',
      description: '各种项目'
    }
  }
};

export default zh;
