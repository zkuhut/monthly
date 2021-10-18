# Monthly

技术栈：[vitepress](https://vitepress.vuejs.org/)

```bash
[monthly]
|- [posts] # 文章根目录
|     |- [user_1] # user_1 目录
|     |     |- [post_1] # 文章 1 目录
|     |     |     |- [assets] # 文章_1 相关资源，无资源可省略
|     |     |     `- index.md # 文章_1 正文
|     |     |- [post_2] # 文章_2 目录
|     |     `- [about] # 自我介绍
|     |           |- [assets] # 相关资源，无资源可省略
|     |           `- index.md # 自我介绍
|     |- [user_1] # user_2 目录
|     `- index.md # 自我介绍大纲
|- [scripts] # 辅助脚本
|     |- [user.ts] # 初始化用户
|     `- ...
|- [node_modules]
|- package.json
|- README.md
`...
```
