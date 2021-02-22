## React 中 setState 同步异步问题

- 生命周期函数和合成事件中：调用 setState 是异步更新 this.state
- 原生事件和异步代码：指的是绕过 React 通过 addEventListener 直接添加的事件处理函数，还有通过 setTimeout/setInterval 产生的异步调用,还可以是 setState 参数是函数的时候
- 原因： 在 React 的 setState 函数实现中，会根据一个变量 isBatchingUpdates 判断是直接更新 this.state 还是放到队列中回头再说，而 isBatchingUpdates 默认是 false，也就表示 setState 会同步更新 this.state，但是，有一个函数 batchedUpdates，这个函数会把 isBatchingUpdates 修改为 true，而当 React 在调用事件处理函数之前就会调用这个 batchedUpdates，造成的后果，就是由 React 控制的事件处理过程 setState 不会同步更新 this.state。
- setState 是同步和异步最关键的因素是 react 内部的执行上下文 executionContext 的状态.当 executionContext 为空时, 表现为同步，反之 executionContext 不为空, 表现为异步。
- 只要绕开 react 内部触发更改 executionContext 的逻辑, 就能保证 executionContext 为空, 进而实现 setState 为同步.

## redux 简单原理

- createStore 函数根据传入的 reducer 创建⼀个 store 对象来存储数据
- 定义一个 getState 函数用于获取当前 store,实现一个 subscrib 用于更新订阅的组件
- 当调用 createStore 的时候会 dispatch 一个初始化 action（@@INIT ），使 store 走(default)初始化
- 通过 dispatch 的 action 提交到 reducer 函数⾥，根据传⼊的 action 的 type，返回新的 state
- 状态发生改变之后，触发 subscribe 的函数进行组件更新

## redux 为什么要把 reducer 设计成纯函数

- 单一数据流 整个应用 state 都被储存在一个 store 里面,State 是只读的 唯一改变 state 的方法就是触发 action, action 是一个用于描述已发生事件的普通对象
- reducer 的作用的是‘接收旧的 state 和 action，返回新的 state’,reducer 的职责不允许有副作用，副作用简单来说就是不确定性，如果 reducer 有副作用，那么返回的 state 就不确定
- redux 的设计思想就是不产生副作用，数据更改的状态可回溯

## react-router 的实现原理

- <BrowserRouter>or<HashRouter> 通过监听 popstate 事件事件或者 hashChange 事件将当前 window.location 的值传递给子组件,传递方式是定义全局的 context 上下文对象
- Route 实现：从上下文对象 context 上面获取 location 参数，和自身组件上面的 props 属性（children、component、render）进行匹配，找到对应的组件进行渲染；
- Link 实现：内部是生成一个<a>标签，跳转链接，处理点击事件在 context.history.push(组件的 to 属性)

## BrowserRouter 与 HashRouter 对⽐

- HashRouter 最简单，不需要服务器端渲染，靠浏览器的#的来区分 path 就可以，BrowserRouter 需要服务器端对不同的 URL 返回相同的 HTML
- BrowserRouter 使⽤ HTML5 history - 可以通过 pushState() .replaceState()等函数向 history 中添加路由信息，History.back() forward() .go()等操作可以触发 history 的 popstate,从而达到路由效果。

## React 基本原理

- jsx：React 使⽤ JSX 来替代常规的 JavaScript，已经成为一种标准写法，babel-loader 会预编译 JSX 为 React.createElement(...)
- React.createElement：将 jsx 解析并创建虚拟 DOM，vdom 能够完整描述 dom 结构
- ReactDOM.render：当⾸次调⽤时，容器节点⾥的所有 DOM 元素都会被替换，
- 调用 setState()方法，相同的 render()⽅法会返回⼀棵不同的树（React 都会重新构建整个 DOM 树）,React 基于这两棵树之间的差别来进⾏⾼效的 dom 更新
- React 中使用 fiber 及 window.requestIdleCallback()来实现这种高效的 diff 操作,渲染过程采用切片的方式
- 而且 React 能够批处理虚拟 DOM 的刷新，在一个事件循环（Event Loop）内的两次数据变化会被合并

## diff 策略

- tree diff:React 对树的算法进行了简洁明了的优化，即对树进行分层比较，两棵树只会对同一层次的节点进行比较,即同一个父节点下的所有子节点。当发现节点已经不存在，则该节点及其子节点会被完全删除掉，不会用于进一步的比较;
- component diff:如果是同一类型的组件，按照原策略继续比较 virtual DOM tree,如果不是，则将该组件判断为 dirty component，从而替换整个组件下的所有子节点,允许用户通过 shouldComponentUpdate() 来判断该组件是否需要进行 diff;
- element diff:当节点处于同一层级时，React diff 提供了三种节点操作，分别为：INSERT_MARKUP（插入）、MOVE_EXISTING（移动）和 REMOVE_NODE（删除）

## flux 和 redux

- Flux 的缺点为：一个应用可以拥有多个 store，多个 store 直接可能有依赖关系(相互引用);Store 封装了数据和处理数据的逻辑。
- Redux 两个特点：在整个应用只提供一个 Store，它是一个扁平的树形结构，一个节点状态应该只属于一个组件;不允许修改数据。即不能修改老状态，只能返回一个新状态。

## Component、PureComponent 与 function Component

- 经过 React.createElement 处理之后，三个组件的区别就是 type 不一样了
- 在 react-dom.development.js 中，ctor.prototype.isPureReactComponent 判断有没有这个标识，有就是 PureComponent，只会对 props 和 state 进行浅比较
- class 组件之间复用状态逻辑困难，复杂组件变得不好理解

## react 性能优化

- 减少不必要的渲染，例如使用 shouldComponentUpdate、Purecomponent、React.memo
- 缓存数据：useMemo 缓存参数，useCallback 缓存函数
- 函数和对象尽量不要用内联方式，Router 中渲染函数使用 render 或者 children,不使用 component
- 部滥用功能，比如 context、props,对于长列表可以分页

## Route 渲染内容的三种⽅式

- 优先级：children>component>render

## React context 的理解

在 React 中，数据传递一般使用 props 传递数据，维持单向数据流，这样可以让组件之间的关系变得简单且可预测，但是单向数据流在某些场景中并不适用。单纯一对的父子组件传递并无问题，但要是组件之间层层依赖深入，props 就需要层层传递显然，这样做太繁琐了！Context 提供了一种在组件之间共享此类值的方式，而不必显式地通过组件树的逐层传递 props。可以把 context 当做是特定一个组件树内共享的 store，用来做数据传递。简单说就是，当你不想在组件树中通过逐层传递 props 或者 state 的方式来传递数据时，可以使用 Context 来实现跨层级的组件数据传递。有了解 JS 作用域链概念的开发者应该都知道，JS 的代码块在执行期间，会创建一个相应的作用域链，这个作用域链记录着运行时 JS 代码块执行期间所能访问的活动对象，包括变量和函数，JS 程序通过作用域链访问到代码块内部或者外部的变量和函数。假如以 JS 的作用域链作为类比，React 组件提供的 Context 对象其实就好比一个提供给子组件访问的作用域，而 Context 对象的属性可以看成作用域上的活动对象。由于组件的 Context 由其父节点链上所有组件通过 `getChildContext()` 返回的 Context 对象组合而成，所以，组件通过 Context 是可以访问到其父组件链上所有节点组件提供的 Context 的属性。
