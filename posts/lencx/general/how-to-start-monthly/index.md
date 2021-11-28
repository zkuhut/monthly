# 怎样贡献一篇文章？

## 关于项目

项目基于 [github](https://github.com) + [github pages](https://pages.github.com/) + [github actions](https://docs.github.com/en/actions/learn-github-actions/workflow-syntax-for-github-actions) + [vitepress](https://vitepress.vuejs.org/) 构建，网站请访问 [《臻苦舍月刊》](https://zkuhut.github.io/monthly/)

```bash
[monthly] # 仓库结构
|- [posts] # 文章根目录
|     |- [.vitepress] # vitepress
|     |- [user_1] # user_1 目录
|     |     |- [category] # 如果内容复杂，建议分类，后再创建文章目录
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

## 快速开始

### Step1

注册/登录 [github 账号](https://github.com)

### Step2

Fork [`zkuhut/monthly` 项目](https://github.com/zkuhut/monthly)

### Step3

> 以 yarn 为例，命令中的 `<username>` 为 github 用户名

```bash
# 1. clone 项目
git clone https://github.com/<username>/monthly.git

# 2. 进入目录
cd monthly

# 3. 安装依赖
yarn

# 4. 生成用户文章写作空间
# 在 `/posts/<username>` 目录下创建文章文件夹，并将链接添加到 `/posts/<username>/toc.ts`
yarn user <username>
ℹ [TOC] ~> /posts/<username>/toc.ts
ℹ [workspace] ~> /posts/<username>/
✔ <username> created successfully!

# 5. 如果需要自定义用户样式
# 会在根结点为 `#app` 的 div 上生成名为 `<username>-app` 的 class
# <div id="app" class="<username>-app">...</div>
yarn style <username>
ℹ [style] ~> /posts/<username>/user.scss
✔ user.scss created successfully!

# 6. 启动项目
yarn dev

# 7. 校验 markdown
yarn lint
```

### Step4

贡献代码，创建 [Pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork)

## 注意事项

1. 文章评论系统依赖 `pathname`，所以尽可能保证链接名称有意义，而且一旦确定，不要轻易进行变更，否则会导致评论丢失。
2. 规范 markdown 写作，方便维护，可以参考 [阮一峰/中文技术文档的写作规范](https://github.com/ruanyf/document-style-guide)。
3. 原创为主，题材不限，可以是思考，技术等。
4. 不要打广告，引用或借鉴的资源要有出处。
5. 如果内容复杂，建议提前做好内容分类，不然修改文章链接会影响评论（`注意事项 1`）

## 基本语法

### 标题

```md
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题
```

::: warning 注意
在一篇文章中

- 一级标题只可以出现一次
- 兄弟标题中同级标题只可以出现一次
:::

### 代码块

⌨️ 输入

- **```md**
- **```js**
- **```vue{2-3,5}** - 高亮行号 `2-3` 及 `5`
- 支持 `html` `css` `scss` `less` `ts` `rust` `go` 等

🖥 输出

```md
<!-- md -->
```

```vue{2-3,5}
<template>
  <div>vue</div>
</template>

<script>
// code...
</script>
```

### 文字样式

⌨️ 输入

```md
**加粗一**
__加粗二__
_斜体一_
*斜体二*
***加粗斜体***
`标记`
```

🖥 输出

**加粗一**\
__加粗二__\
_斜体一_\
*斜体二*\
***加粗斜体***\
`标记`

### 资源

```md
[链接描述](https://github.com/)
![图片描述](https://avatars.githubusercontent.com/u/88203179)
```

### 块引用

⌨️ 输入

```md
> 块引用
>> 嵌套块引用
```

🖥 输出

> 块引用
>> 嵌套块引用

### TODO 列表

⌨️ 输入

```md
- [ ] 待做
- [x] 完成
```

🖥 输出

- [ ] 待做
- [x] 完成

### 列表

⌨️ 输入

```md
- 列表格式一
- 列表格式一
* 列表格式二
* 列表格式二
```

🖥 输出

- 列表格式一
- 列表格式一
* 列表格式二
* 列表格式二

### 表格

⌨️ 输入

```md
|标题|文字居右|文字居中|
|---|---:|:---:|
|标题一|10|20|
|标题二|10|20|
```

🖥 输出

|标题|文字居右|文字居中|
|---|---:|:---:|
|标题一|10|20|
|标题二|10|20|

:::tip 表格分割线类型

- 文字居左（默认） `|---|`
- 文字居左 `|:---|`
- 文字居右 `|---:|`
- 文字居中 `|:---:|`

:::

## 扩展语法

> vitepress markdown 语法增强

```md
<!-- 提示 -->
::: tip
This is a tip
:::

<!-- 信息 -->
::: info
This is an info box
:::

<!-- 警告 -->
::: warning
This is a warning
:::

<!-- 危险 -->
::: danger
This is a dangerous warning
:::
```

::: tip
This is a tip
:::

::: info
This is an info box
:::

::: warning
This is a warning
:::

::: danger
This is a dangerous warning
:::

## 参考链接

- [Basic Syntax](https://www.markdownguide.org/basic-syntax/) - The Markdown elements outlined in John Gruber's design document.
- [Vitepress Markdown Extensions](https://vitepress.vuejs.org/guide/markdown.html)
- [Vitepress Frontmatter](https://vitepress.vuejs.org/guide/frontmatter.html)
