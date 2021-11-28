require('esbuild-register');
const env = require('./env.json');
const sidebar = require('./sidebar.json');

const navItems = Object.keys(sidebar).map((i) => ({
  text: i.replace(/\//g, ''),
  link: `${i}about/`,
}));

module.exports = {
  title: 'Monthly',
  description: '',
  base: env.base,

  head: [
    ['script', {
      src: 'https://giscus.app/client.js',
      async: 'true',
      'data-repo': 'zkuhut/monthly',
      'data-repo-id': 'R_kgDOGO-xdQ',
      'data-category': 'Comments',
      'data-category-id': 'DIC_kwDOGO-xdc4CADo4',
      'data-mapping': 'pathname',
      'data-reactions-enabled': '1',
      'data-emit-metadata': '0',
      'data-theme': 'light',
      // 'data-lang': 'zh-CN',
      'crossorigin': 'anonymous',
    }],
  ],


  markdown: {
    // lineNumbers: true,
    toc: { includeLevel: [1, 2, 3, 4] },
    config: (md) => {
      // use more markdown-it plugins!
      md.use(require('markdown-it-task-lists'))
    }
  },

  themeConfig: {
		docsDir: 'posts',
    repo: 'zkuorg/monthly',
    repoLabel: '点 ⭐️ 不迷路',
    docsBranch: 'main',
    editLinks: true,
    editLinkText: 'Edit this page',
    lastUpdated: 'Last Updated',
    sidebar,
    nav: [
      {
        text: '✍️ 作者',
        items: navItems,
      },
    ],
  }
}
