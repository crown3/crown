module.exports = {
  dest: 'gh-pages',
  base: '/crown/',
  locales: {
    '/': {
      lang: 'en-US',
      title: 'Crown',
      description: 'A quick launchbar in your chrome, may be your next Alfred in Chrome'
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'Crown',
      description: '一款 Chrome 上的 launchbar, 希望能成为你 Chrome 上的 Alfred'
    }
  },
  head: [
    ['link', {
      rel: 'icon',
      href: `/img/crown.png`
    }],
    ['link', {
      rel: 'manifest',
      href: '/manifest.json'
    }],
    ['meta', {
      name: 'theme-color',
      content: '#3eaf7c'
    }],
    ['meta', {
      name: 'apple-mobile-web-app-capable',
      content: 'yes'
    }],
    ['meta', {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'black'
    }],
    ['link', {
      rel: 'apple-touch-icon',
      href: `/img/crown.png`
    }],
    ['link', {
      rel: 'mask-icon',
      href: '/img/crown.svg',
      color: '#3eaf7c'
    }],
    ['meta', {
      name: 'msapplication-TileImage',
      content: '/img/crown.png'
    }],
    ['meta', {
      name: 'msapplication-TileColor',
      content: '#000000'
    }]
  ],
  serviceWorker: true,
  themeConfig: {
    repo: 'crown3/crown',
    editLinks: true,
    docsDir: 'docs',
    locales: {
      '/': {
        label: 'English',
        selectText: 'Languages',
        editLinkText: 'Edit this page on GitHub',
        lastUpdated: 'Last Updated',
        nav: [{
            text: 'Guide',
            link: '/guide/',
          },
          {
            text: 'Code',
            link: '/code/'
          },
          {
            text: 'About',
            link: '/about/'
          },
          {
            text: 'Change log',
            link: '/changelog/'
          },
        ],
      },
      '/zh/': {
        label: '简体中文',
        selectText: '选择语言',
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdated: '上次更新',
        nav: [{
            text: '指南',
            link: '/zh/guide/',
          },
          {
            text: '代码',
            link: '/zh/code/'
          },
          {
            text: '关于',
            link: '/zh/about/'
          },
          {
            text: '更新记录',
            link: '/zh/changelog/'
          },
        ],
      }
    }
  }
}
