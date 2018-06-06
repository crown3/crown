module.exports = {
  dest: 'gh-pages',
  locales: {
    '/': {
      lang: 'en-US',
      title: 'Crown',
      description: 'Your chrome housekeeper, just like alfred on mac'
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'Crown',
      description: 'Chrome 上的管家'
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
      href: '~@root/src/assets/crown.svg',
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
    repo: 'vuejs/vuepress',
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
            text: 'Config Reference',
            link: '/config/'
          },
          {
            text: 'Default Theme Config',
            link: '/default-theme-config/'
          }
        ],
        sidebar: {
          '/guide/': genSidebarConfig('Guide')
        }
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
            text: '配置',
            link: '/zh/config/'
          },
          {
            text: '默认主题',
            link: '/zh/default-theme-config/'
          }
        ],
        sidebar: {
          '/zh/guide/': genSidebarConfig('指南')
        }
      }
    }
  }
}

function genSidebarConfig(title) {
  return [{
    title,
    collapsable: false,
    children: [
      '',
      'getting-started',
      'basic-config',
      'assets',
      'markdown',
      'using-vue',
      'custom-themes',
      'i18n',
      'deploy'
    ]
  }]
}
