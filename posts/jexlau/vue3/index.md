# Vite + Vue3 + TSX + Mock 搭建完整项目

## 1. 环境要求


-  [node](www.nodejs.org)：Node.js 版本 >= 12.0.0，目前使用版本：v14.16.0 
-  包管理工具：npm/yarn，目前使用的是 yarn：v1.22.10 
-  编辑器：VSCode 



## 2. Vite + Vue3 搭建初始化


1. 全局安装 vite



```bash
yarn global add vite


# 安装vite+vue3.0项目，Vite 需要 Node.js 版本 >= 12.0.0。
D:/
# 基于vite搭建项目，项目名：rbac-manage，前端框架使用vue，开发语言：typescript
yarn create vite
# √ Project name: ... rbac-manage
# √ Select a framework: » vue
# √ Select a variant: » vue-ts

# 切换工作目录到rbac-manage，
cd rbac-manage
# 下载项目运行的前端依赖模块
```


2. 基于 vite 搭建项目，项目名：rbac-manage，前端框架使用 vue3，开发语言：TypeScript



```bash
yarn create vite

# √ Project name: ... rbac-manage
# √ Select a framework: » vue
# √ Select a variant: » vue-ts
```


3. 启动项目



```bash
# 切换工作目录到rbac-manage
cd rbac-manage
# 下载项目运行的前端依赖模块
yarn
# 启动测试服务器，运行vue项目
yarn dev
```


至此，一个由 Vite 构建的 Vue3 项目就搭建好了，支持 TypeScript 语法。


## 3. 路由 Router 的安装和配置


1. 安装 vue-router 4.x



```bash
yarn add vue-router@next
```


2. 配置路由模块



创建`src/router/index.ts`，代码：


```typescript
import {createRouter, Router, createWebHistory, RouteRecordRaw} from 'vue-router'

// 路由列表
const routes:Array<RouteRecordRaw> = [
  // 省略，见项目src/router/index.ts具体代码
]

const router:Router = createRouter({
  // history, 指定路由的模式
  history: createWebHistory(),
  // 路由列表
  routes,
});

export default router
```


根据项目的模块划分，设计项目目录和项目路由如下：


-  创建`src/views`目录，然后分别添加 login 目录，member 目录，device 目录，operator 目录，point-group目录，scenario 目录，wbs 目录，每个目录添加 Index.vue 文件，作为每个模块的入口文件，如下图：
-  更新项目路由`src/router/index.ts`中的 router 如下： 



```typescript
const routes: Array<RouteRecordRaw> = [
  {
    name: "index",
    path: "/",
    redirect: "/member",
  },
  {
    name: "Login",
    path: "/login",
    component: () => import("../views/login/Index.vue"),
  },
];
```


- 引入 router.ts 到项目中



在`src/main.ts`文件，把 router 对象注册到项目中


```typescript
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

createApp(App).use(router).mount("#app");
```


在`src/App.vue`组件中，添加显示路由对应的内容：


```typescript
<template>
  <router-view />
</template>

<script setup lang="ts"></script>
```


至此，完成项目路由切换的搭建。


## 4. 配置 tsx 支持


> 文档：[https://cn.vitejs.dev/guide/features.html#jsx](https://cn.vitejs.dev/guide/features.html#jsx)



1. 安装插件



```bash
yarn add -D @vitejs/plugin-vue-jsx
```


2. 配置`vite.config.ts`



```typescript
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx({})],
});
```


3. 配置 tsconfig.json



```json
{
  "compilerOptions": {
    "jsx": "preserve",
    "jsxFactory": "h",
    "jsxFragmentFactory": "Fragment"
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"]
}
```


4. 测试 vue3 + tsx



在 components 目录下创建一个 TestDemo.tsx 文件，并在页面中引用，测试是否成功解析 tsx 文件：


```typescript
import { FunctionalComponent as FC, defineComponent, reactive, onMounted } from 'vue';

// 无状态组件
const FcNode: FC<{ data: number }> = ({ data }) => {
  return (
    <>
      <hr />
      <div>子组件：
        {data < 10 ? <span>{data}</span> : <h1>{data}</h1>}
      </div>
    </>
  )
};

// 状态组件需要使用 defineComponent
export default defineComponent({
  name: 'TsxDemo',
  setup() {
    const data = reactive({ count: 0 });

    onMounted(() => {
      data.count = 5;
    });

    const clickHandler = () => data.count++

    return () => (
      <>
        <span style={{ marginRight: '10px' }}>{ data.count }</span>
        <button onClick={clickHandler}>+</button>
        <FcNode data={data.count}/>
      </>
    )
  }
})
```


至此，tsx 的配置已完成。


## 5. less 的安装和使用


> 文档：[https://cn.vitejs.dev/guide/features.html#css](https://cn.vitejs.dev/guide/features.html#css)



1. 安装



```bash
yarn add less
```


Vite 提供了对 .scss, .sass, .less, .styl 和 .stylus 文件的内置支持，不需要为它们安装特定的 vite 插件，只需安装预处理器依赖本身即可在项目中直接使用。


2. 测试 less 是否生效，以及 css module



在 vue 开发中，为防止各个组件间样式污染通常需要给组件设置局部生效的样式。


- 在 .vue 单文件中使用：



```vue
<style scoped lang="less">
.header {
  font-size: 36px;
  font-weight: bold;
}
</style>
```


- 在 .tsx 文件中使用：在样式文件后缀名前加上 .module（index.module.less），在tsx中导入该样式使用。



```tsx
import classes from "./tsx.module.less"

const FcNode: FC<{ data: number }> = ({ data }) => {
  return (
    <>
      <hr />
      <div class={classes['son-header']}>子组件：
        {data < 10 ? <span>{data}</span> : <h1>{data}</h1>}
      </div>
    </>
  )
};
```


至此，可在项目中正常使用 less 语法。


## 6. 样式统一引入


- 创建`src/styles/reset.less`文件，清除默认样式。
- 创建`src/styles/index.less`文件，作为统一的样式管理，同时可以编写一些全局样式。



```less
@import "./reset.less";

/* Global css */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
```


- 在`main.ts`中引入`src/styles/index.less`



## 7. ElementUI 的安装和使用


> 文档：[https://element-plus.org/zh-CN/](https://element-plus.org/zh-CN/)



1. 安装



```bash
yarn add element-plus
```


2. 以插件的形式按需引入 ElementUI



- 创建`scr/plugins/element-plus.ts`插件，以引入 Button 组件为例：



```typescript
import { createApp } from "vue";
// 引入样式
import "element-plus/dist/index.css";
// 按需引入组件
import { ElButton, ElMessage } from "element-plus";

export default function loadComponent(app: ReturnType<typeof createApp>) {
  // 注册组件
  app.use(ElButton);
  app.config.globalProperties.$message = ElMessage;
}
```


- 创建`scr/plugins/index.ts`文件，便于统一引入插件：



```typescript
import { createApp } from 'vue'
import elementPlugin from "./element-plus";

/**
 * @description 加载所有 Plugins
 * @param  {ReturnType<typeofcreateApp>} app 整个应用的实例
 */
export function loadAllPlugins(app: ReturnType<typeof createApp>) {
  elementPlugin(app)
}
```


- 在`src/main.ts`文件中加载所有插件：



```typescript
import { createApp } from "vue";
import App from "./App.vue";
import { loadAllPlugins } from "./plugins";
import router from "./router";

// 应用实例
const app = createApp(App)

// 加载所有插件
loadAllPlugins(app)

app.use(router).mount("#app");
```


- 在页面中使用：



```vue
<template>
  <div class="header">
    <el-button>my button</el-button>
  </div>
</template>
```


## 8. vite 配置路径别名


为了方便复用代码，习惯配置路径别名设置为@，具体配置如下：


- 在`vite.config.ts`文件中配置：



```typescript
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  }
});
```


- 在`tsconfig.json`中配置



```json
"compilerOptions": {
    "paths": {
        "@/*": ["./src/*"]
    }
},
```


- 在页面中引用



```typescript
import TsxDemo from "@/components/TsxDemo"
```


（PS: 配置完成后重启下项目）


## 9. i18n 配置多语言


1. 安装 vue-i18n



```bash
yarn add vue-i18n@next
```


2. 创建多语言`src/locale/zh-cn.ts`语言文件，`src/locale/ja.ts`语言文件，再创建`src/locale/index`文件统一引入语言文件：



```typescript
import Keys from "@/constant/key";
import { createI18n } from "vue-i18n";
import localeLangJa from "./ja";
import localeLangZhCn from "./zh-cn";

const messages = {
  "zh-cn": {
    ...localeLangZhCn,
  },
  ja: {
    ...localeLangJa,
  },
};

export const getLocale = () => {
  // 先寻找缓存里的lang
  const localLanguage = window.localStorage.getItem(Keys.languageKey);
  if (localLanguage) {
    return localLanguage;
  }
  // 如果缓存没有设置lang，根据所在地查询配置并显示对应lang
  const language = navigator.language.toLowerCase();
  const locales = Object.keys(messages);
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale;
    }
  }

  // 没有对应的语言配置，显示默认语言
  return "ja";
};

const i18n = createI18n({
  // 设置地区
  locale: getLocale(),
  // 设置地区信息
  messages,
});

export default i18n;
```


3. 结合 ElementUI 组件库，配置多语言



在 App.vue 文件中注入全局多语言配置：


```vue
<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { getLocale } from "@/locale"

/** 配置默认语言 */
const locale = ref<string>(getLocale())
</script>
```


4. 使用语法：$t("key")

