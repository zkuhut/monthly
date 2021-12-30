# React 图片预加载组件的实现

> 现代 Web app 在处理图片的时候一般会采用加载 `<img>` 元素自动加载对应的图片资源的方式，但在某些特定需求下，需要在进入正式页面前就进行图片加载，这个加载过程中也同时需要进行 loading 页面的进度计数操作。因此，本文着重探讨在 React 语境下的图片预加载组件的实现。

## 图片预加载原理

在 javascript 中，对于图片的预加载，一般这样处理：

```javascript
// 创建 img 对象
const img = new Image()

// 定义 onload 事件函数
img.onload = () => {
  // 完成加载后，对 img 对象进行操作
}

// 对 src 属性赋值
img.src = 'path/to/image'
```

在 React 的组件中也将这样处理，但更优雅一点的，我们封装一个 `Promise` :

```javascript
const imgLoadPromise = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      resolve(img)
    }
    img.onerror = (err) => {
      reject(err)
    }
    img.src = src
  })
}
```

## 来一个手搓的 Provider

状态管理是个好东西，很多人说到 React 的状态管理都会想到 Redux 。但是在拥有了 Hooks 之后，一些简单的状态管理就不需要额外的依赖其他库。

多的就不说了，直接 show code ：

```jsx
// loading state

import { createContext, useReducer } from 'react'

// 状态初始化数据
const initialState = {
  loadingShow: true, // 是否显示 loading 页面
  loadingPercent: 0, // 预加载进度，单位 %
  sourceCount: 0,    // 需要加载的图片数量
  sourceLoaded: 0,   // 已经加载的图片数量
}

// 状态管理 reducer
const reducer = (state, action) => {
switch (action.type) {
    case 'hideLoading':
      return {
        ...state,
        loadingShow: false,
      }
    case 'updateLoading':
      return {
        ...state,
        loadingPercent: action.payload,
      }
    case 'countSource':
      return {
        ...state,
        sourceCount: state.sourceCount + 1,
      }
    case 'loadSource':
      const loaded = state.sourceLoaded + 1
      const percent = state.sourceCount
        ? Math.floor((loaded / state.sourceCount) * 100)
        : 0
      return {
        ...state,
        sourceLoaded: loaded,
        loadingPercent: percent,
        loadingShow: percent < 100,
      }
    default:
      throw new Error(`no such action: ${action.type}`)
  }
}

export const Context = createContext(
  state: initialState,
  dispatch: () => null,
)

const Provider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  )
}

export default Provider
```

## 开始撸组件了

前文中所描述的 `Provider` 主要是为了统计全局的预加载状态，准备好之后，可以开始进行组件的编写：

```jsx
import { useContext, useEffect, useState } from 'react'
import { Context } from 'loadingState'

const Preload = ({src}) => {
  const [img, setImg] = useState(null)
  const [state, dispatch] = useContext(Context)

  useEffect(() => {
    dispatch('countSource')
    imgLoadPromise(src).then(img => {
      setImg(img)
      dispatch('loadSource')
    })
  })

  return img
}

export default Preload
```

## 组件的使用

在根组件中可以用 `Provider` 组件，将所有的需要进行状态管理的组件包裹在其中：

```jsx
<Provider>
  <Preload src="path/to/image" />
</Provider>
```

可以监控一下 state 中图片的加载进度。

## 篇后

此种预加载图片资源的方式只适合整个交互流程都在同一个页面的 SPA 中，如果是需要对于图片资源组件卸载的场景就不适用了。

对于后面的场景将在以后的文中进行探讨。
