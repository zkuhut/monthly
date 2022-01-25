export default {
  "/xiaofuyesnew/": [
    { text: "关于xiaofuyesnew", link: "/xiaofuyesnew/about/" },
    // other post links
    // { text: 'Basic Skills', link: '/xiaofuyesnew/BasicSkills/' }
    { text: "从零开始搭建一个vite+vue3项目", link: "/xiaofuyesnew/handleVite/" },
    { text: "React 图片预加载组件的实现", link: "/xiaofuyesnew/imagePreload/" },
    {
      text: "利用腾讯云开发实现web端的小程序扫码授权",
      link: "/xiaofuyesnew/miniAuth/",
      children: [{
        text: "原理篇",
        link: "/xiaofuyesnew/miniAuth/intro/",
      }],
    },
  ],
} as TOC;
