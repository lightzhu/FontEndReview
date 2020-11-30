## React 中 setState 同步异步问题

- 生命周期函数和合成事件中：调用 setState 是异步更新 this.state
- 原生事件和异步代码：指的是绕过 React 通过 addEventListener 直接添加的事件处理函数，还有通过 setTimeout/setInterval 产生的异步调用,还可以是 setState 参数是函数的时候
- 原因： 在 React 的 setState 函数实现中，会根据一个变量 isBatchingUpdates 判断是直接更新 this.state 还是放到队列中回头再说，而 isBatchingUpdates 默认是 false，也就表示 setState 会同步更新 this.state，但是，有一个函数 batchedUpdates，这个函数会把 isBatchingUpdates 修改为 true，而当 React 在调用事件处理函数之前就会调用这个 batchedUpdates，造成的后果，就是由 React 控制的事件处理过程 setState 不会同步更新 this.state。
- setState 是同步和异步最关键的因素是 react 内部的执行上下文 executionContext 的状态.当 executionContext 为空时, 表现为同步，反之 executionContext 不为空, 表现为异步。
- 只要绕开 react 内部触发更改 executionContext 的逻辑, 就能保证 executionContext 为空, 进而实现 setState 为同步.

## redux 简单原理

- createStore 函数根据传入的 reducer 创建⼀个 store 对象来存储数据
- 定义一个 getState 函数用于获取当前 store,实现一个 subscrib 用于更新订阅的组件
- 当调用 createStore 的时候会 dispatch 一个初始化 action，使 store 走(default)初始化
- 通过 dispatch 的 action 提交到 reducer 函数⾥，根据传⼊的 action 的 type，返回新的 state
- 状态发生改变之后，触发 subscribe 的函数进行组件更新

## redux 为什么要把 reducer 设计成纯函数

- 单一数据流 整个应用 state 都被储存在一个 store 里面,State 是只读的 唯一改变 state 的方法就是触发 action, action 是一个用于描述已发生事件的普通对象
- reducer 的作用的是‘接收旧的 state 和 action，返回新的 state’,educer 的职责不允许有副作用，副作用简单来说就是不确定性，如果 reducer 有副作用，那么返回的 state 就不确定
- redux 的设计思想就是不产生副作用，数据更改的状态可回溯

## react-router 的实现原理

- <BrowserRouter>or<HashRouter> 通过监听 popstate 事件事件或者 hashChange 事件将当前 window.location 的值传递给子组件,传递方式是定义全局的 context 上下文对象
- Route 实现：从上下文对象 context 上面获取 location 参数，和自身组件上面的 props 属性（children、component、render）进行匹配，找到对应的组件进行渲染；
- Link 实现：内部是生成一个<a>标签，跳转链接，处理点击事件在 context.history.push(组件的 to 属性)

## BrowserRouter 与 HashRouter 对⽐

- HashRouter 最简单，不需要服务器端渲染，靠浏览器的#的来区分 path 就可以，BrowserRouter 需要服务器端对不同的 URL 返回相同的 HTML
- BrowserRouter 使⽤ HTML5 history API（ pushState，replaceState 和 popstate 事件），让⻚⾯的 UI 于 URL 同步。

## React 基本原理

- jsx：React 使⽤ JSX 来替代常规的 JavaScript，已经成为一种标准写法，babel-loader 会预编译 JSX 为 React.createElement(...)
- React.createElement：将 jsx 解析并创建虚拟 DOM，vdom 能够完整描述 dom 结构
- ReactDOM.render：当⾸次调⽤时，容器节点⾥的所有 DOM 元素都会被替换，
- 调用 setState()方法，相同的 render() ⽅法会返回⼀棵不同的树。React 基于这两棵树之间的差别来进⾏⾼效的 dom 更新
- React 中使用 fiber 及 window.requestIdleCallback()来实现这种高效的 diff 操作
