# 代码规范相关计划文面

## 目的:养成统一的团队规范

### 一、尽量实现代码风格统一

1. 一定要熟悉规范文档的要求，然后再进行开发。
2. 尽量做到与文档的要求一致，在无法实现的情况下尽量询问如何用相应的方法实现相应的业务要求。

### 二、让开发者水平跟理解保持在统一水平线。

1. 尽量开发者都是用HTML5+CSS3+JS(ES最新规范)。
2. 开发者可以分享页面性能、设计模式、算法相关等文章让大家了解并应用下去。

### 三、节省开发时间成本。

1. 每次编写业务代码时可利用画图或者其他之类方法先做业务模式设计。减少相应的bug跟时间成本。
2. 凡事能够复制的都可以提取出去做公用。

## 预期效果

1. 通过一段时间让大家了解代码规范,使得团队代码风格尽量做到统一。

2. 让大家尽量去拥抱新技术。去熟悉其原理。

3. 轻松阅读同事之间的代码逻辑。

## 方法：通过相应的文档、编辑器工具、CI 工具、个人约束来实现代码规范。

### 一、HTML、CSS、JS 规范文档

### 二、css 项目工具：[stylelint](http://stylelint.docschina.org/user-guide/rules/)
1. 安装使用
```shell
npm install stylelint --save-dev
// 需配合安装 stylelint-config-standard stylelint-config-prettier 插件
```
2. 添加命令
```shell
"lint:style": "stylelint \"src/**/*.less\" --syntax less",
```
3. 在lint-staged中添加

### 三、js 项目工具：[Eslint](https://cn.eslint.org/)
1. 安装使用 
```shell
// 全局安装
npm install eslint -g
// 项目安装
npm install eslint --save-dev

2. 使用
```shell
// 初始化项目eslint 根据相应的项目要求配置所需配置
eslint init
```
### 四、利用 git hooks 检测代码提交
```shell
// 在 lint-staged中添加
"*.{js,jsx,ts,tsx}":["git add","eslint", "prettier --write"],
 "**/*.less": "stylelint --syntax less"
```

### 五、gitlab-CI 工具
在项目创建时做好```gitlab``` Web钩子的配置,做好事件推送机制。
在Jenkins中代码编译。
### 六、定期时间沟通试用方法

## 过程

### 一、制定 gitlab 新项目模版
1. 做好web端template模板。
2. 做好小程序template模板。
### 二、阅读代码规范文档
1. 阅读代码规范文档，主要是js中的规范，内容相对较多。能应用到项目中去。
2. 在新项目开发过程中严格使用。
### 三、记录开发时遇到的问题
在gitlab中开放问题记录文档。随时可提交，可给出相应的解决方案。然后定期讨论解决相应的问题。
### 四、代码 review
所有人都可查看前端项目的代码，每次提交在群中发出相应的提交地址。每个人都可查看评论，如果符合代码规范，没有任何问题即可MR。否则打回重新调整提交。
```shell
// 暂存所有文件
git add .
// 提交当前暂存的文件
git commit -m "内容" // 内容规定：时间-开发内容-开发/bug提交等
// 提交跟踪过的文件
git commit -am "跟踪文件"
// 可使用alias 定义快捷命令
git config --global alias.xx "commit -am"
// 新提交与上次提交保存在一个commit
git commit --amend -m "内容"
// 如果想撤回工作目录禁止使用reset可食用revert
git revert ’工作记录id‘
// 开启fetch。
// 熟悉使用meger、remote、branch、 stash /stash pop 、 rebase、log、 reflog、 cherry-pick等命令
```
## 验收效果

1. 是否达到制定目的跟预期效果
2. 相应的工具是否使用熟练
3. 真正开发中是否遇到不可抗拒的问题

## 团队思考

### 一、如何去加强我们的代码规范约束

### 二、怎么让我们的代码规范能持续稳定的继承下去

### 三、谁去维护相应的文档跟技术的迭代更新
