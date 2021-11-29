# redux and redux-toolkit

# redux 

**Redux 的适用场景：多交互、多数据源。**

 >从组件角度看，如果你的应用有以下场景，可以考虑使用 Redux。
  >* 某个组件的状态，需要共享
  >* 某个状态需要在任何地方都可以拿到
  >* 一个组件需要改变全局状态
  >* 一个组件需要改变另一个组件的状态


## Redux API概念

  1. **Store 就是保存数据的地方，你可以把它看成一个容器。整个应用只能有一个 Store。** 

      >**Redux 提供createStore这个函数，用来生成 Store。**
        >1. Store.getState() 获取Store中的state数据
        >2. Store.dispatch() dispatch(Action) 触发对应Reducer改变state的值
      ```js
      import { createStore } from 'redux';
      <!-- createStore 接受第一个参数为 reducer 对象 ,第二个参数为 中间件的应用 -->
      const store = createStore(fn);
      ```

  2. **Action 是一个对象。其中的type属性是必须的，表示 Action 的名称。其他属性可以自由设置** 

      ```js
      const action = {
        type: 'counter/incremented',
        payload: 'Learn Redux'
      };
      ```

  3. **Reducer 是一个函数，它接受 Action 和当前 State 作为参数，返回一个新的 State**
      
      > 一般数用switch 去判断 action的 type 然后做出对应的操作,修改state的值

        >reducer的规则
          >* 仅使用 state 和 action 参数计算新的状态值
          >* 禁止直接修改 state。必须通过复制现有的 state 并对复制的值进行更改 的方式来做 不可变更新（immutable updates）
          >* 禁止任何异步逻辑、依赖随机值或导致其他“副作用”的代码

      ```js
      function counterReducer(state = { value: 0 }, action) {
        switch (action.type) {
          case 'counter/incremented':
            return { value: state.value + 1 }
          case 'counter/decremented':
            return { value: state.value - 1 }
          default:
            return state
          }
        } 
      };
      ```

## redux 完整工作流

  ```js

    import { createStore } from 'redux'

        function counterReducer(state = { value: 0 }, action) {
          switch (action.type) {
            case 'counter/incremented':
              return { value: state.value + 1 }
            case 'counter/decremented':
              return { value: state.value - 1 }
            default:
              return state
            }
          }

          // Its API is { subscribe, dispatch, getState }.
        let store = createStore(counterReducer)

        store.subscribe(() => console.log(store.getState()))

        store.dispatch({ type: 'counter/incremented' })
        // {value: 1}
        store.dispatch({ type: 'counter/incremented' })
        // {value: 2}
        store.dispatch({ type: 'counter/decremented' })
        // {value: 1}  

  ```

## Thunk 

  >**Redux 使用叫做“中间件”这样的插件模式来开发异步逻辑官方的处理异步中间件叫 redux-thunk，包含在 Redux Toolkit 中**
    >* 您可以 dispatch 其他 action 来帮助跟踪 API 调用的加载状态


  ```js
    const asyncAction = ()=>(dispatch,getState)=>{
        // 异步操作.....
      // 获取Store中的数据-->state
      const state = getState();
      dispatch(同步action())
    }
  ```

  # Redux-tookit 

  ## Redux-tookit API概念

  1. **configureStore(): 包装 createStore 以提供简化的配置选项和良好的默认预设。它可以自动组合你的切片 reducers，添加您提供的任何 Redux 中间件，默认情况下包含 redux-thunk ，并允许使用 Redux DevTools 扩展。**
  *** 
  2. **createReducer(): 为 case reducer 函数提供 action 类型的查找表，而不是编写switch语句。此外，它会自动使用immer 库来让您使用普通的可变代码编写更简单的 immutable 更新，例如 state.todos [3] .completed = true 。**
  ***
  3. **createAction(): 为给定的 action type string 生成一个action creator 函数。函数本身定义了 toString()，因此它可以用来代替 type 常量。**
  ***
  4. **createSlice(): 接受一个 reducer 函数的对象、分片名称和初始状态值，并且自动生成具有相应 action creators 和 action 类型的分片reducer。**

  > Redux Toolkit 有一个名为 createSlice 的函数，它负责生成 action 类型字符串、action creator 函数和 action 对象的工作。您所要做的就是为这个切片定义一个名称，编写一个包含 reducer 函数的对象，它会自动生成相应的 action 代码。name 选项的字符串用作每个 action 类型的第一部分，每个 reducer 函数的键名用作第二部分。因此，"counter" 名称 + "increment" reducer 函数生成了一个 action 类型 {type: "counter/increment"}。（毕竟，如果计算机可以为我们做，为什么要手写！）
  ***

  5. **createAsyncThunk: 接受一个 action type string 和一个返回 promise 的函数，并生成一个发起基于该 promise 的pending/fulfilled/rejected action 类型的 thunk。**

  >**createAsyncThunk 接收2个参数:**
    > 1. 将用作生成的 action 类型的前缀的字符串
    > 2. 一个“payload creator”回调函数，它应该返回一个包含一些数据的 Promise，或者一个被拒绝的带有错误的 Promise

  ***

  6. **createEntityAdapter: 生成一组可重用的 reducers 和 selectors，以管理存储中的规范化数据**
  ***

## 使用redux-toolkit

### 创建createSlice
> **createSlice**

> **createAsyncThunk**
```js

import {createSlice , createAsyncThunk} from '@redux/toolkit'

export const asyncThunk = createAsyncThunk('about/aboutThunk', async (init:string) => {
  const response = await axios.get('case/initCreateCase')
    return response
})

const postsSlice = createSlice({
  name: 'posts',
  initialState:{
    value:0,
    text:'使用createSlice 及 createAsyncThunk'
  },
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.push(action.payload)
      },
      // 接受参数,先运行然后返回给reducer中的action.payload
      prepare(title, content) {
        return {
          payload: {
            id: nanoid(),
            title,
            content
          }
        }
      }
    }
    // other reducers here
  },
  extraReducers: {
    // 'about/aboutThunk/pending': (state, action) => {
    //   console.log('开始---->',action)
    // },
    [aboutThunk.pending.toString()]: (state, action) => {
      state.status = '开始'
      console.log('开始')
    },
    'about/aboutThunk/fulfilled': (state, action) => {
      console.log('成功----->',action)
      state.status = action.payload.msg
    },
    'about/aboutThunk/rejected': (state, action) => {
      state.status='失败'
    },
   
  }
})

export default postsSlice;
export const {postAdded } = postsSlice.action;

// thunk异步函数
export const asyncAddCount = (org: string, repo: string) => (dispatch: Dispatch) => {
  setTimeout(() => {
    dispatch(postAdded());
  }, 5000);
};

```

### 创建Store
>**configureStore**

```js
import { configureStore } from '@reduxjs/toolkit';
import postsSlice from '../pages/app/model';

// {
//   status: 'idle' | 'loading' | 'succeeded' | 'failed',
//   error: string | null
// }

export const store = configureStore({
  reducer: {
    posts: postsSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;
```
### 重新编写useDispatch useSelector

```js
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import  { RootState, AppDispatch } from './index';

// 使用ts时,在页面中使用state会自动添加类型
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
```

### 在页面中使用
```js

import React, { useState, useEffect, FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/reduxHooks';
import { postAdded ,asyncThunk, asyncAddCount } from './model/index';


type Iprops = { name: string };

const GetComponent: FC<Iprops> = ({ name }) => {
  const [propsName, setName] = useState(name);
  const dispatch = useAppDispatch();
  const value = useAppSelector(state => state.posts.value);
  const text = useAppSelector(state => state.posts.text);
  return (
    <div className="app">
      <div>{value}</div>
      <div>{text}</div>
      <div onClick={()=>{useAppDispatch(postAdded())}} >{text}</div>
      <div onClick={()=>{useAppDispatch(asyncThunk())}} >{text}</div>
      <div onClick={()=>{useAppDispatch(asyncAddCount())}} >{text}</div>
    </div>
  );
};
export default GetComponent;

```

# 参考文献
  阮一峰: https://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html
