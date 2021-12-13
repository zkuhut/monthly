vue3响应式原理

本文基于 [vue-next 3.2.4](https://github.com/vuejs/vue-next/tree/v3.2.4) 版本，对 @vue/reactivity 进行解读，仅仅是 vue 的响应式原理解析，不包含 DOM

# 响应式原理

Vue 3 实现响应式，本质上是通过 Proxy API 劫持了数据对象的读写

当我们**访问**数据时，会触发 getter 执行依赖**收集**（track）；

**修改**数据时，会触发 setter 执行通知派发（trigger）。



我们从 ref 对象入手，看看具体的过程是什么

## Ref对象的实现

通过 ref 的实现，看依赖是什么，是怎么被收集的

```typescript
// https://github.com/vuejs/vue-next/blob/v3.2.4/packages/reactivity/src/ref.ts#L81
export function ref(value?: unknown) {
  return createRef(value)
}

// https://github.com/vuejs/vue-next/blob/v3.2.4/packages/reactivity/src/ref.ts#L121
function createRef(rawValue: unknown, shallow = false) {
  // 如果已经是ref，则直接返回
  if (isRef(rawValue)) {
    return rawValue
  }
  return new RefImpl(rawValue, shallow)
}
```

我们直接看看 RefImpl 是什么

```typescript
class RefImpl<T> {
  private _value: T
  private _rawValue: T

  // 用于存储依赖，作用后面细说
  public dep?: Dep = undefined
  public readonly __v_isRef = true

  constructor(value: T, public readonly _shallow = false) {
    // 保存原始value
    this._rawValue = _shallow ? value : toRaw(value)
    // convert是，如果value是对象则 reactive(value)，否则返回value
    this._value = _shallow ? value : convert(value)
  }

  get value() {
    // 收集依赖
    trackRefValue(this)
    return this._value
  }

  set value(newVal) {
    newVal = this._shallow ? newVal : toRaw(newVal)
    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal
      this._value = this._shallow ? newVal : convert(newVal)
      // 触发依赖
      triggerRefValue(this, newVal)
    }
  }
}
```

所以定义 ref 的时候，主要做了以下事情：

1. 判断入参是否已经是 ref 了，是的话直接返回
2. new RefImpl 对象，在 ref 对象被访问时，trace 收集依赖，被修改时，trigger 触发依赖

​                 ![img](https://gitee.com/candyTong/img/raw/master/img/Bssg8HlL5hx6IZ5CT5KDow.png)

## 依赖是怎么被收集的

```typescript
// 节选自 https://github.com/vuejs/vue-next/blob/v3.2.4/packages/reactivity/src/ref.ts#L29
export function trackRefValue(ref: RefBase<any>) {
  // 判断是否需要搜集依赖
  if (isTracking()) {
    ref = toRaw(ref)
    if (!ref.dep) {
      ref.dep = createDep()
    }
    trackEffects(ref.dep)
  }
}
```

几个问题：

1. 为什么需要判断是否收集依赖？

​	不是任何情况 ref 被访问时，都需要收集依赖，例如，onMounted 的时候，访问了ref，难道 ref 被修改了，需要重新出发 onMounted 吗？这显然不合理，所以需要判断，具体怎么判断，后面再说

2. ref.dep是什么？

​	ref.dep：`Set<ReactiveEffect>` ，是一个存储 effect（副作用）的集合，effect 是什么？后面会细说。暂时先理解为被收集的依赖，就是effect。track收集依赖的过程，就是把当前的 effect，加入到 ref.dep 中



我们再来看看 trackEffects：

```typescript
// 节选自 https://github.com/vuejs/vue-next/blob/v3.2.4/packages/reactivity/src/effect.ts#L212

let activeEffect: ReactiveEffect | undefined
export function trackEffects(
  dep: Dep
) {
  let shouldTrack = false
  // 已经track收集过依赖，就可以跳过了
  shouldTrack = !dep.has(activeEffect!)

  if (shouldTrack) {
    // 收集依赖，将effect存储到dep
    dep.add(activeEffect!)
    // 同时effect也记录一下dep，用于trigger触发effect后，清除dep里面对应的effect
    activeEffect!.deps.push(dep)
}
```

收集依赖，就是把 activeEffect（当前的 effect ），放到 ref.dep 中（当触发依赖时，遍历 ref.dep 执行 effect ）

然后把 ref.dep，也放到 effect.deps 中（用于在触发依赖后， ref.dep.delete(effect)，删除依赖）

​                 ![img](https://gitee.com/candyTong/img/raw/master/img/lWtCEZm0LXCoGauf1PFwtQ.png)



## 依赖是怎么被触发的

track 收集依赖看完，那看看依赖时怎么触发的

```typescript
// 节选自 https://github.com/vuejs/vue-next/blob/v3.2.4/packages/reactivity/src/ref.ts#L47
export function triggerRefValue(ref: RefBase<any>, newVal?: any) {
  ref = toRaw(ref)
  if (ref.dep) {
     triggerEffects(ref.dep)
  }
}
```

再来看看 triggerEffects

```typescript
export function triggerEffects(
  dep: Dep | ReactiveEffect[]
) {
  for (const effect of isArray(dep) ? dep : [...dep]) {
    // 默认不允许递归
    if (effect !== activeEffect || effect.allowRecurse) {
      // effect.scheduler可以先不管，computed有，ref和reactive没有
      if (effect.scheduler) {
        effect.scheduler()
      } else {
        // 执行effect
        effect.run()
      }
    }
  }
}
```

这里省略了一些代码，这样结构更清晰

当 ref 被修改时，会trigger触发依赖，触发依赖，实际上是执行了 ref.dep 里的所有 effect



## effect 副作用是什么？

先总结一下

track 收集依赖 —— 将effect保存响应式对象的 dep 中（如 ref.dep ）

trigger 触发依赖 —— 将响应式对象的 dep（如 ref.dep ），中的所有 effect 执行

那么 effect 是什么呢？



在介绍它之前，我们来回顾一下什么是响应式的需求

```typescript
import { ref } from 'vue'
const counter = ref(0)
function logCount() {   
  console.log(counter)
}
logCount()
counter.value++
```

我们的预期是 counter.value++ 之前，counter.value 打印出0， counter.value++ 之后，打印出1

但很遗憾，事实上只打印出了0。

因为依赖没有被搜集到（就像上面说的 onMounted 没有执行依赖收集）

那怎么才能知道 logCount 依赖了counted 呢？

我们来看看一个简单的实现

```typescript
let activeEffect: ReactiveEffect | undefined
function wrapper(fn) {   
  const wrapped = function(...args) {
    // 标记我当前正在执行fn
    activeEffect = fn     
    // 执行需要收集依赖的函数
    fn(...args) 
    activeEffect = undefined
  }   
  return wrapped
}
```

在我们的这个例子中，我们在 logCount 包一层 wrapper 函数：

```typescript
const counter= ref(1)
function logCount() {   
  console.log(counter)
}
wrapper(logCount)()
```

这样 fn 执行的时候，activeEffect === fn，在 fn 里面使用到了 counter，会执行 trackEffect，将 activeEffect 记录下来，就能知道，fn（logCount），依赖了 counter

回顾一下，上一节的 trackEffect，是不是把 activeEffect 保存在了 ref.dep 中完成收集。于是 ref 就知道了，依赖了 effect

![](https://gitee.com/candyTong/img/raw/master/img/20211213215223.png)

在 vue3，effect 函数的作用就是，要 track 收集 effect 函数里面的依赖，我们先看 effect 函数的其中一个测试用例

```typescript
// https://github.com/vuejs/vue-next/blob/v3.1.5/packages/reactivity/__tests__/ref.spec.ts#L22
it('should be reactive', () => {
  const a = ref(1)
  let dummy
  let calls = 0
  effect(() => {
    calls++
    dummy = a.value
  })
  expect(calls).toBe(1)
  expect(dummy).toBe(1)
  a.value = 2
  expect(calls).toBe(2)
  expect(dummy).toBe(2)
  // same value should not trigger
  a.value = 2
  expect(calls).toBe(2)
  expect(dummy).toBe(2)
})
```

effect 的使用方法，如测试用例那样，里面传入一个需要 track 收集依赖的函数即可

我们来看一下 effect 的实现

```typescript
// 节选自 https://github.com/vuejs/vue-next/blob/v3.2.4/packages/reactivity/src/effect.ts#L145
export function effect<T = any>(
  fn: () => T
){
  // effect的fn，可能也是一个effect，所以要获取到最初始的fn
  if ((fn as ReactiveEffectRunner).effect) {
    fn = (fn as ReactiveEffectRunner).effect.fn
  }

  const _effect = new ReactiveEffect(fn)
  _effect.run()
  
  const runner = _effect.run.bind(_effect)
  runner.effect = _effect
  return runner
}
```

所以 effect 函数主要做了两件事情

1. const _effect = new ReactiveEffect(fn)
2. _effect.run()



再看看 ReactiveEffect是什么



```typescript
// https://github.com/vuejs/vue-next/blob/v3.2.4/packages/reactivity/src/effect.ts#L53
export class ReactiveEffect<T = any> {
  active = true
  deps: Dep[] = []

  constructor(
    public fn: () => T,
    public scheduler: EffectScheduler | null = null,
    scope?: EffectScope | null
  ) {
    recordEffectScope(this, scope)
  }

  run() {
    if (!effectStack.includes(this)) {
      try {
        // 保存上一个的activeEffect，因为effect可以嵌套
        effectStack.push((activeEffect = this))
        // 开启shouldTrack开关，缓存上一个值
        enableTracking()

        // 在该effect所在的所有dep中，清除还effect
        cleanupEffect(this)
        // 执行函数，执行过程中，又会track当前的effect进来
        return this.fn()
      } finally {
        // 关闭shouldTrack开关，恢复上一个值
        resetTracking()
        // 恢复上一个的activeEffect
        effectStack.pop()
        const n = effectStack.length
        activeEffect = n > 0 ? effectStack[n - 1] : undefined
      }
    }
  }
}
```

关注几个问题：

1. 为什么要用栈保存状态？

​	因为effect可能会嵌套，需要保存之前的状态，effect执行完成后恢复

2. cleanupEffect 做了什么？

​	回顾一下下图，effect.deps，存储着所有依赖的 dep（这些 dep 里，都包含该 effect ），为的是用于 effect 执行后，能够找到对应的 dep 集合，并删除当前执行过的 effect

![](https://gitee.com/candyTong/img/raw/master/img/20211213215223.png)

```typescript
function cleanupEffect(effect: ReactiveEffect) {
  const { deps } = effect
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].delete(effect)
    }
    deps.length = 0
  }
}
```

1. 为什么要在所有dep删除该effect？

​	在所有dep删除该effect，然后在执行effect的时候，会重新将依赖收集回来。因为这执行前后的依赖可能不一致，考虑一下情况：

```typescript
const switch = ref(true)
const foo = ref('foo')
effect( () = {
  if(switch.value){
    console.log(foo.value)
  }else{
    console.log('else condition')
  }
})
switch.value = false
```

当 switch 为 true 时，triggerEffect，清除所有 dep 中的该 effect，执行一遍 effect，switch、foo 会重新搜集到依赖 effect

​                 ![img](https://gitee.com/candyTong/img/raw/master/img/zh6w1sfRvjbjocVJ_P0TxA.png)

当 switch 变成 false 后，triggerEffect，清除所有 dep 中的该 effect，effect 执行后，仅有 switch 能重新搜集到依赖 effect

​                 ![img](https://gitee.com/candyTong/img/raw/master/img/wrAbd5WvJuXcwm0oVqE7GA.png)

由于 effect 前后，依赖的响应式对象（这里是 ref ）可能不一致，响应式对象（这里是 ref ）的 dep 重新搜集到的 effect 也不一致。因此需要先清除，再重新搜集。

其实这里也省略了一个优化（跟之前省略的是同一个），优化方案中，并不是先清除，再搜集的，而是 effect 执行后，对比 effect 前后差异，仅清除没有被重新收集到的响应式对象（这里是 ref ）的 dep 中的 effect。具体优化细节，后面细说

## **阶段总结**

我们完整地看一遍以下这段代码的依赖收集和触发：

```typescript
const a = ref(1)
let dummy
let calls = 0
effect(() => {
  if(calls===0) b.value++
  calls++
  dummy = a.value
})
b.value++
```

![img](https://gitee.com/candyTong/img/raw/master/img/vPXwBLvV9Y2ewDlnhf_FYw.gif)



# 触发依赖的响应式优化

在 trackEffect、effect.run 执行时，省略了一部分优化内容。

回顾一下，effect.run() 执行副作用fn前，会先把所有的依赖都删除，然后 fn 执行时，会 track 重新把依赖收集回来。

其实这是不必要的，因为大多数情况下，依赖都是不变的。

因此，可以将 fn 执行前后依赖，进行对比，然后只删除fn执行后，不再使用的依赖

我们来看看 Dep 的真实结构：

```typescript
// https://github.com/vuejs/vue-next/blob/v3.2.4/packages/reactivity/src/dep.ts#L3
export type Dep = Set<ReactiveEffect> & TrackedMarkers
type TrackedMarkers = {
  /**
   * wasTracked
   */
  w: number
  /**
   * newTracked
   */
  n: number
}
```

要进行前后对比，就要有相应的标记为，w 就是前标记，n 就是后标记，是个 number 类型。

![img](https://gitee.com/candyTong/img/raw/master/img/s134sAI3VzQbJm8HpKaqIQ.png)        标记，则是将某一位，设置为 1，表示该 dep（该 ref )在该深度，被搜集依赖了

是不是有点算法题的味道了

具体怎么使用后面会细说

```typescript
export class ReactiveEffect<T = any> {
  run() {
    // 调用stop函数后的effect，不再收集依赖
    if (!this.active) {
      return this.fn()
    }
    
    if (!effectStack.includes(this)) {
      try {
        // 当前effect压栈
        effectStack.push((activeEffect = this))
        // 开启全局 shouldTrack，允许依赖收集
        enableTracking()
            
        // 追踪深度自增，最大30深度
        // 追踪标记的位，这个后面细说
        trackOpBit = 1 << ++effectTrackDepth

        // 超过最大追踪深度，降级为cleanupEffect，执行前删除所有依赖，执行时重新追踪依赖
        if (effectTrackDepth <= maxMarkerBits) {
          // 将所有dep.w 标记，视为为旧依赖
          initDepMarkers(this)
        } else {
          cleanupEffect(this)
        }
        return this.fn()
      } finally {
        if (effectTrackDepth <= maxMarkerBits) {
          // 清理不再使用的依赖
          finalizeDepMarkers(this)
        }

        // 恢复trackOpBit和effectTrackDepth
        trackOpBit = 1 << --effectTrackDepth

        // 恢复上一次的全局 shouldTrack状态
        resetTracking()
        // 恢复上一个activeEffect
        effectStack.pop()
        const n = effectStack.length
        activeEffect = n > 0 ? effectStack[n - 1] : undefined
      }
    }
  }

  stop() {
    if (this.active) {
      cleanupEffect(this)
      if (this.onStop) {
        this.onStop()
      }
      this.active = false
    }
  }
}
```

再看看如何标记旧依赖

```typescript
export const initDepMarkers = ({ deps }: ReactiveEffect) => {
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].w |= trackOpBit // set was tracked
    }
  }
}
```

deps[i].w |= trackOpBit，就是将（ effectTrackDepth + 1）位，设置为 1

![img](https://gitee.com/candyTong/img/raw/master/img/ISjYzcrYY67_VnqgRq6T8w.png)

**所以，当 dep.w 的某个 bit 被标记为1，就是旧依赖**

**同理，当 dep.n 的某个 bit 被标记为1，就是新依赖**



详细的看 trackEffects 代码：

```typescript
// https://github.com/vuejs/vue-next/blob/v3.2.4/packages/reactivity/src/effect.ts#L212
let effectTrackDepth = 0
export let trackOpBit = 1
export function trackEffects(
  dep: Dep,
  debuggerEventExtraInfo?: DebuggerEventExtraInfo
) {
  let shouldTrack = false
  // 如果符合条件，使用优化方案，否则降级使用优化前的方案，effect.run会cleanup所有dep
  if (effectTrackDepth <= maxMarkerBits) {
    // 如果没有被标记新依赖
    if (!newTracked(dep)) {
      // 标记为新依赖
      dep.n |= trackOpBit 
      // 如果依赖已经被收集，则不需要再次收集
      shouldTrack = !wasTracked(dep)
    }
  } else {
      // 降级方案
      shouldTrack = !dep.has(activeEffect!)
  }

  if (shouldTrack) {
    dep.add(activeEffect!)
    activeEffect!.deps.push(dep)
  }
}
```

判断，在当前深度，dep 是否被标记为新依赖/旧依赖

```typescript
// https://github.com/vuejs/vue-next/blob/v3.2.4/packages/reactivity/src/dep.ts#L28
export const wasTracked = (dep: Dep): boolean => (dep.w & trackOpBit) > 0

export const newTracked = (dep: Dep): boolean => (dep.n & trackOpBit) > 0
```

用位运算，这种非常巧妙的判断是否被标记

![img](https://gitee.com/candyTong/img/raw/master/img/jsMguIqBksS5ZkmyoEeeYg.png)

至此，我们已经知道了如何标记一个 ref，在当前的深度，effect 执行前后，是否有被标记

effect 的 fn 执行前，先标记所有dep为旧依赖

effect 执行时，trackEffec t时，标记依赖的 dep 为新依赖

一前一后的标记，然后对比差异，删除不需要的依赖，代码如下：

```typescript
export const finalizeDepMarkers = (effect: ReactiveEffect) => {
  const { deps } = effect
  if (deps.length) {
    let ptr = 0
    // 遍历所有dep
    for (let i = 0; i < deps.length; i++) {
      const dep = deps[i]
      // 如果是旧依赖、且不是新依赖，就删除依赖
      if (wasTracked(dep) && !newTracked(dep)) {
        dep.delete(effect)
      } else {
        // 否则，将dep保存到前面的位置，后面 deps.length = ptr 删除多余的元素
        deps[ptr++] = dep
      }
      // 将当前深度的w和n，设置为0
      dep.w &= ~trackOpBit
      dep.n &= ~trackOpBit
    }
    // 删除多余的元素
    deps.length = ptr
  }
}
```

再次被这美妙的位运算惊艳到了！

![img](https://gitee.com/candyTong/img/raw/master/img/AuwWmgpqF5YKhZL1Uu4CSA.png)

另外，还有 wasTracked 和 newTracked 有以下组合：                 ![img](https://gitee.com/candyTong/img/raw/master/img/A93J7Wpfb3WohWsZ89jf9Q.png)

总结一下优化点：

1. 在 effect 执行前，将 effect.deps 的所有 dep，标记为旧依赖
2. 在 effect 执行时，trackEffect 收集依赖时，将当前被收集的响应式对象属性的 dep，标记为新依赖
3. 遍历 effect.deps，去除不需要使用的依赖
