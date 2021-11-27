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
