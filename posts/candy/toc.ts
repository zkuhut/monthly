export default {
  '/candy/': [
    { text: 'About', link: '/candy/about/' },
    {
      text: 'Vue',
      children: [
        { text: 'vue3 响应式原理', link: '/candy/vue/ref/' },
      ],
    },
    // other post links
  ],
} as TOC;
