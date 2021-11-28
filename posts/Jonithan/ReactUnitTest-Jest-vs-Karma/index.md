## 前言
近期在做React组件库方面的单元测试，从一开始使用jest技术栈到使用karam技术栈，中间踩了一些坑，以此文记录、总结。

## 基础知识介绍
在单测中，一般有几个概念需要了解，分别是：

* 测试运行环境（Test Runtime）：指单元测试代码的执行环境。对前端来说运行环境主要有Node模拟环境（如jsdom）与浏览器真实环境。
* 测试运行工具（Test Runner）：是负责解析和调用单元测试代码并加载测试运行环境（Test Runtime）的工具。
* 测试框架（Testing Framework）：提供了describe()、it()、afterEach()等函数，用于描述测试用例。
* 断言库（Assertion Library）：提供了expect()用于判断结果是否正确的工具。
* 扩展（Testing Plugin）：测试工具方面的扩展，比如sinon，可以提供mock、spy、stub等的功能。

以上基础分类参考和引用了[单元测试：从 Jest 到 Karma+Mocha+Chai](https://guoyunhe.me/2021/03/19/unit-test-jest-to-karma-mocha-chai/)和[What is the difference between a test runner, testing framwork, assertion library, and a testing plugin?](https://amzotti.github.io/testing/2015/03/16/what-is-the-difference-between-a-test-runner-testing-framework-assertion-library-and-a-testing-plugin/)两篇文章的内容，对于一些基础概念可以继续深入，本文将更多针对在React技术框架上的对比。

了解完基础概念后，继续了解React单元测试工具。React单元测试工具是针对React框架的，所以**无论是使用jest体系或者karma体系都是可以使用的。** 其渲染原理也是调用了React的API，将内容渲染到测试运行环境上（无论是jsdom还是浏览器真实环境）。

目前React单元测试工具主要有两类：

* [React Testing Library（简称RTL）](https://testing-library.com/docs/react-testing-library/intro/)
* [Enzyme](https://enzymejs.github.io/enzyme/)

RTL的哲学是模拟用户操作，通过渲染出来的内容变动去判断结果是否正确。Enzyme则提供了React组件内部state的判断，可以用于判断结果是否正确。

但目前社区活跃来说，Enzyme已经远远不及RTL，Enzyme目前官方支持的React版本最新只有16，17版本还是社区热心人士提供的；而RTL则非常活跃，[甚至是官方推荐的单元测试框架](https://reactjs.org/docs/test-utils.html#overview)，并且被集成在create-react-app脚手架（CRA）中，当你使用CRA创建一个项目时，其附带的单测例子就是使用RTL的。所以本文中也使用RTL作为React的单元测试工具。

## 使用jest技术栈
根据分类，如果是使用Jest技术栈的话，整体结构如下，可以看到Jest几乎为我们提供了所有的配置。

![Jest技术栈](https://blog-1256056666.cos.ap-guangzhou.myqcloud.com/img/Jest%E6%8A%80%E6%9C%AF%E6%A0%88.jpg)



### 优点

* 做到了几乎开箱即用，与CRA绑定，可直接上手
* 文档资料多，上手相对简单

### 缺点

* 测试运行环境短期内仅支持jsdom，在遇到调用浏览器API时，需要开发者自行mock；一些功能甚至无法mock，下文举详细例子

## 使用Karma技术栈
根据分类，如果是使用Karma技术栈的话，整体结构如下，可以看到测试框架、断言库等都需要开发者自行配置，因为Karam没有提供这些工具。当然，开发者也可以根据自行需要使用[Jasmine](https://jasmine.github.io/)配置测试框架和断言库。

![Karma技术栈](https://blog-1256056666.cos.ap-guangzhou.myqcloud.com/img/Karma%E6%8A%80%E6%9C%AF%E6%A0%88.jpg)

### 优点
* 直接使用浏览器环境，不需要mock浏览器相关的API，这是使用Karma技术栈最大的优势。
* 灵活，开发者可根据需要自行配置

### 缺点
* 配置比较繁杂，文档少，上手成本相对高

## 如何选择？
Jest技术栈与Karam技术栈都是很优秀的方案，在实际场景中根据需求选择即可。如果你测试的React应用或组件库中，代码或者其依赖库大量使用了浏览器API，mock麻烦，就可以考虑使用Karma技术栈


这里举一个具体的例子，可以考虑使用Kama技术栈。

假设你的业务组件库依赖于一个UI库，UI库依赖于[Popper.js](https://popper.js.org/)，**你的任务是对业务组件库配置单元测试。**

UI库中调用了Popper.js的API定位UI组件显示位置，而Popper.js底层则是使用了`e.currentTarget.getBoundingClientRect()`这个浏览器的API。在jsdom环境下，会直接返回
```
{ bottom: 0, height: 0, left: 0, right: 0, top: 0, width: 0 }
```
Popper.js则会取其中的值进行计算，其中一步除法计算为0 / 0 = NaN，直接导致后续的代码无法运行下去。而使用Karma技术栈的话，在真实浏览器环境中运行，则不会有这个问题。


## 参考资料
[What is the difference between a test runner, testing framwork, assertion library, and a testing plugin?](https://amzotti.github.io/testing/2015/03/16/what-is-the-difference-between-a-test-runner-testing-framework-assertion-library-and-a-testing-plugin/)  
[使用 Karma + Mocha + Chai 搭建 Web 单元测试环境](https://liuyib.github.io/2020/03/20/use-karma-mocha-chai-to-test/)  
[单元测试：从 Jest 到 Karma+Mocha+Chai](https://guoyunhe.me/2021/03/19/unit-test-jest-to-karma-mocha-chai/)  

