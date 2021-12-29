# 工作中的代码重构（一）

最近在工作中遇到一个迭代比较久的项目，其中有一个文件代码行数3000多行（未eslint格式化的情况下），所有的视频控件代码都集中在这个文件，很多函数都特别大，逻辑比较混乱，可以预见到后续的可维护性会越来越差，所以产生了一个重构的想法。同时最近也在读《重构2》这本书，书中列了何时重构：

1. 预备性重构：让添加新功能更容易，比如结构微调、合并重复逻辑
2. 帮助理解的重构：使代码更易懂，比如修改变量名，将长函数拆分成小函数
3. 捡垃圾式重构：比如不必要的复杂逻辑，类似功能函数
4. 有计划的重构：花时间解决历史问题，应该很少
5. 长期重构（推荐）
6. code review时重构

本次的重构属于第五种情况，这种情况要尽可能少，因为工作中很少会有一大块的时间来进行重构，而且这种大规模的重构会带来高风险性，没有测试的保证很容易带来功能破坏。下面主要针对这次重构中涉及的一些修改做说明，后续工作中会坚持长期重构，所以本文档是系列文章。

### 类型数字

项目中经常遇到有个类型字段，很多逻辑需要根据这个类型字段的值进行区分判断，如：

```vue
<div v-if="infoType === 1">
    逻辑1
</div>
<div v-if="infoType === 2">
    逻辑2
</div>
<div v-if="infoType === 3">
    逻辑3
</div>
```

这种代码必须要加注释表面1、2、3分别代表什么意思才行，而且reviewer必须经常去对照代码和注释才能明白里面的逻辑属于哪类，这种代码可以使用带含义的常量来替换value值来解决。

```vue
<div v-if="infoType === INFO_TYPE.videoPlayBack">
    逻辑1
</div>
<div v-if="infoType === INFO_TYPE.videoCollect">
    逻辑2
</div>
<div v-if="infoType === INFO_TYPE.videoSuppleRecord">
    逻辑3
</div>
```

改成上面这种会不会更加清晰一些呢，只要单词取名语义化一些，就一目了然里面的逻辑分类，不用再去找注释对照的看。

### 可选链

我们经常会遇到有一个结构层级比较深的对象，我们需要使用里面的一个字段，为了保证不出错，我们需要进行层层判断，像这种：

```vue
<span v-if="
    screenDownMsg &&
    screenDownMsg.videoInfo &&
    screenDownMsg.videoInfo.recordType !== 4
">
  录制时间：{{
   screenDownMsg.videoInfo && screenDownMsg.videoInfo.recordStartTime
   }}
</span>
```

这种代码即增加了编写时间，也增加了代码长度，后期维护性降低，我们可以使用js的可选链来修改，当然可选链不支持IE11，vue的template直接使用也不支持，需要使用babel插件处理，这个大家使用百度一下就好了。

```vue
<span v-if="$$(screenDownMsg,'videoInfo','recordType') !== RECORD_TYPE.stationVideo">
   录制时间：{{$$(screenDownMsg,'videoInfo','recordStartTime')}}
</span>
```

改成上面这种，使用函数封装了可选链处理，挂载在vue的原型上。

### if-else逻辑判断优化

业务中经常会存在判断逻辑，特别是判断特别多的时候，使用if-else会导致代码整体可维护性降低，如：

```javascript
if (data.funcName === 'LoadModule') {
    逻辑1
} else if (data.funcName === 'setWindowLayout') {
    逻辑2
} else if (data.funcName === 'WebSnapPic') {
    逻辑3
} else if (data.funcName === 'RealplayTimeAcqureResponse') {
    逻辑4
}
...
```

特别是if里面的逻辑还特别长，甚至里面还嵌套if-else，看代码的人需要理很久才能搞清楚整体的逻辑，这种代码可以使用策略模式进行优化：

```javascript
// 策略类
let strategy = {
  LoadModule(param) {
    逻辑1
  },
  setWindowLayout(param) {
    逻辑2
  },
  WebSnapPic(param) {
    逻辑3
  },
  RealplayTimeAcqureResponse(param) {
    逻辑4
  }
};

// 调用策略类中的方法
// 环境类
function videoCallBack(strategyName, param) {
  return strategy[strategyName] && strategy[strategyName](param);
}
videoCallBack(data.funcName, param)
```

**策略类** 是指`strategy`对象，保存了所有的策略名对应的方法。

**环境类** 是用接收策略名和其它参数，然后调用对应的策略方法。

好处：

1. 有效的避免了多重条件选择语句。
2. 策略模式提供了对开放-封闭原则的完美支持，将算法独立封装在 strategy 中，使得这些算法易于切换、易于理解、易于扩展。

### 组建类

在《重构2》中有说过：

> 如果发现一组函数形影不离地操作同一块数据（通常是将这块数据作为参数传递给函数），我就认为，是时候组建一个类了。

在业务开发中，会遇到这种情况：很多函数的参数都类似，而且参数较多，虽然可以使用对象的形式改造多参数的问题，但还是会感觉有些变扭，这时就可以使用类来把这些函数集中起来，参数很多都可以共享，传参会减少很多。

### 总结

重构是一种习惯，在需要新增新功能或修改缺陷的时候都可以尝试重构，可能是代码位置调整，可能是变量、函数名的修改，重构的唯一目的是让我们更快，添加功能更快，修改bug更快。



