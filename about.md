# 关于项目

## 项目结构

[vitepress](https://vitepress.vuejs.org/)

```bash
[monthly]
|- [posts] # 文章根目录
|     |- [.vitepress] # vitepress
|     |- [user_1] # user_1 目录
|     |     |- [post_1] # 文章 1 目录
|     |     |     |- [assets] # 文章_1 相关资源，无资源可省略
|     |     |     `- index.md # 文章_1 正文
|     |     |- [post_2] # 文章_2 目录
|     |     `- [about] # 自我介绍
|     |           |- [assets] # 相关资源，无资源可省略
|     |           `- index.md # 自我介绍
|     |- [user_1] # user_2 目录
|     `- [guide] # 序
|- [scripts] # 辅助脚本
|     |- [user.ts] # 初始化用户
|     `- ...
|- [node_modules]
|- package.json
|- README.md
`...
```

## 如何贡献代码

```bash
# Step 1: 安装依赖
# or `npm i`
yarn

# Step2: 如果未创建个人文章区，则执行以下命令
# or `npm run user`
yarn user <username>

# Step3: 启动本地服务
# or `npm run dev`
yarn dev
```
