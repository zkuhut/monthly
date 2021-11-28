export default {
  '/lencx/': [
    { text: 'About', link: '/lencx/about/' },
    {
      text: 'General',
      children: [
        { text: '怎样贡献一篇文章？', link: '/lencx/general/how-to-start-monthly/' },
      ],
    },
    // other post links
  ],
} as TOC;
