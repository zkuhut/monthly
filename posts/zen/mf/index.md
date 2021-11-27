# Webpack module fedoration

module fedoration 是 webpack 5 推出的一项全新功能。它能够为 webpack 提供远程模块

以下使用 mf 简称

## 使用

### 构建模块

指定远程入口文件 scope 以及要暴露的模块

```jsx
// shell
new ModuleFederationPlugin({
  name: "shell",
  filename: "remoteEntry.js",
  exposes: {
    "./shell": "./src/Shell.tsx",
  }
}),
```

### 声明模块（可选）

需要在 plugin 中声明所用的远程模块

```jsx
// app
new ModuleFederationPlugin({
  remotes: {
    shell: "shell@https://cl-shell.vercel.app/remoteEntry.js"
  }
}),
```

### 使用模块

一般会使用异步加载来消费模块

```jsx
const Shell = React.lazy(() => import("shell/shell"));
```

```jsx
import shell from "shell/shell";
```

原生不支持同步加载，需要社区 [plugin](https://www.npmjs.com/package/external-remotes-plugin) 支持

[https://github.com/webpack/webpack/issues/12258](https://github.com/webpack/webpack/issues/12258)

在不使用 ModuleFederationPlugin 选择在运行时加载 mf 模块时，可以使用下面 API

```jsx
// 加载 remoteEntry.js 之后
// scope -> name
// module -> expose
function loadComponent(scope: any, module: any) {
  return async () => {
    await __webpack_init_sharing__("default");
    const container = window[scope];
    await container.init(__webpack_share_scopes__.default);
    const factory = await window[cpm].get(module);
    const Module = factory();
    return Module;
  };
}
```

## 与微前端相比

mf 经常与微前端相提并论，但其实 微前端一般倾向于将 app 视为基础颗粒度，而 mf 则将更加细的模块视为基础颗粒度。与 诸如 qiankun 之类的微前端框架相比，mf

- 无 js 沙盒
- 无样式隔离

但是 mf 在 **依赖共享** 上有着传统微前端做不到的能力，传统微前端框架要想共享依赖，一般做法是使用 external + CDN，但是这会污染全局变量，一旦碰到像 Vue2 和 Vue3 共存的场景就无力解决。另外还需去保证消费方提供的相应的依赖。而 mf 则会默认为 shared 依赖在每个应用打包一份 fallback 依赖，尽管在使用的时候可能不会加载，但是能确保稳定。

```jsx
new ModuleFederationPlugin({
  shared: ['react', 'lodash']
}),
```

## DX

跨项目的开发，远程模块对 TypeScript 的消费端极其不友好，传统微前端暴露给消费者的 API 较少，所以问题不大。但是 mf 则可能暴露比较多的 API，这时我们必须提供 d.ts 来提升开发体验，目前官方无相应方案，需要周边工具来弥补这一缺陷 [@efox/emp-tune-dts-plugin](https://github.com/efoxTeam/emp/blob/main/packages/emp-tune-dts-plugin/README-zh_CN.md)

## Refs

- <https://github.com/module-federation/module-federation-examples/issues/566>
