require('esbuild-register');
const env = require('./env.json');
const sidebar = require('./sidebar.json');

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
  }
}
