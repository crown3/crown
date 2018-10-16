let background_scripts, content_scripts, web_accessible_resources

if (process.env.NODE_ENV === 'development') {
  background_scripts = ['chunk-vendors.js', 'background.js']
  content_scripts = [
    {
      matches: ['<all_urls>'],
      js: ['chunk-vendors.js', 'content-script.js'],
    },
  ]
  web_accessible_resources = ['main.html', '*.js']
} else {
  background_scripts = ['js/chunk-vendors.js', 'js/background.js']
  content_scripts = [
    {
      matches: ['<all_urls>'],
      css: ['css/content-script.css'],
      js: ['js/chunk-vendors.js', 'js/content-script.js'],
    },
  ]
  web_accessible_resources = ['main.html', 'js/*.js', 'css/*.css']
}

module.exports = {
  manifest_version: 2,
  version: process.env.VUE_APP_VERSION,
  name: 'Crown',
  author: '@chenjuncrown',
  homepage_url: 'https://crown3.github.io/crown/',
  description: '__MSG_extDesc__',
  default_locale: 'en',
  icons: {
    '16': 'icons/16.png',
    '48': 'icons/48.png',
    '128': 'icons/128.png',
  },
  permissions: ['bookmarks', 'sessions', 'tabs', '<all_urls>'],
  background: {
    scripts: background_scripts,
    persistent: false,
  },
  browser_action: {
    default_popup: 'main.html',
    default_title: 'Crown',
    default_icon: {
      '19': 'icons/19.png',
      '38': 'icons/38.png',
    },
  },
  offline_enabled: true,
  options_ui: {
    chrome_style: true,
    page: 'main.html#/options',
  },
  content_scripts,
  content_security_policy:
    "script-src 'self' 'unsafe-eval' https://ssl.google-analytics.com; object-src 'self'",
  web_accessible_resources,
  commands: {
    _execute_browser_action: {
      suggested_key: {
        default: 'Alt+X',
      },
    },
    'open-in-content': {
      description: '__MSG_contentHotKey__',
      global: true,
      suggested_key: {
        default: 'Alt+S',
      },
    },
  },
  omnibox: {
    keyword: 'c',
  },
}
