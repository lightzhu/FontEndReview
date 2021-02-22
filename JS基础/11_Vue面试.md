## Vuex

- 每一个 Vuex 里面有一个全局的 Store，包含着应用中的状态 State，这个 State 只是需要在组件中共享的数据，不用放所有的 State，这个 State 是单一的，和 Redux 类似，所以，一个应用仅会包含一个 Store 实例。单一状态树的好处是能够直接地定位任一特定的状态片段，在调试的过程中也能轻易地取得整个当前应用状态的快照。store 实例化的时候会在其构造函数中将 store 的 state 属性做响应式的处理。Vuex 通过 store 选项通过插件的形式把 state 注入到了整个应用中(挂载到 Vue.prototype)，这样子组件能通过 this.\$store 访问到 state 了。

## vue 实现原理

- 数据响应式，模版引擎，渲染
- Object.defineProperty 方法（vue3 中通过 Proxy）会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回这个对象。vue 中通过这种方式将所有的 data 数据进行层层的劫持，并将这些数据代理到 vm 实例上。
- Observer:劫持监听所有属性，defineReactive（定义响应式）的时候创建一个 Dep 对象，用于保存对应依赖数据的 watcher。Dep 对象有两个功能：收集依赖，发布事件（批量更新）
- Compile:模版编译。vue 中的模版最终会通过 vue-loader 编译成 js(createElement 函数) 代码，原理是借鉴 snabbdom 的方式，生成 h()函数(vue 中是\_c 函数)，函数生成对应的虚拟 dom（vnode）,“虚拟 DOM”是我们对由 Vue 组件树建立起来的整个 vnode 树的称呼
- 渲染：当页面初次渲染的时候会调用\_render 函数，过程中会访问到 data 中的数据，访问之前生成一个 watcher 对象，将此对象的 target 赋值成本身，在对应的 data 的 get 函数中将此 watcher 对象收集到对应值的 dep 对象中（这里是 vm 的关键），当下次 data 的更改会被 set 函数监听到，这个时候会调用对应 dep 对象的 notify 函数，其上的 watcher 对象依次更新，实现数据响应。\_update 会生成真实的 dom，初次 patch 的时候添加 dom 到对应的节点下面，
- Vue 在更新 DOM 时是异步执行的。只要侦听到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是非常重要的。然后，在下一个的事件循环“tick”中，Vue 刷新队列并执行实际 (已去重的) 工作。Vue 在内部对异步队列尝试使用原生的 Promise.then、MutationObserver 和 setImmediate，如果执行环境不支持，则会采用 setTimeout(fn, 0) 代替。
- data 属性变化，触发 rerender,修改属性，被响应式的 set 监听到,set 中执行 updateComponent,updateComponent 重新执行 vm.\_render(),生成的 vnode 和 prevVnode ，通过 patch 进行对比
- patchVnode（diff）:updateComponent 中实现了 vdom 的 patch,包括三种类型操作：属性更新、文本更新、子节点更新
  - 新老节点均有 children 子节点，则对子节点进行 diff 操作，调用 updateChildren
  - 如果老节点没有子节点而新节点有子节点，先清空老节点的文本内容，然后为其新增子节点
  - 当新节点没有子节点而老节点有子节点的时候，则移除该节点的所有子节点
  - 当新老节点都无子节点的时候，只是文本的替换
  - updateChildren 主要作用是用一种较高效的方式比对新旧两个 VNode 的 children 得出最小操作补丁。执行一个双循环是传统方式，vue 中针对 web 场景特点做了特别的算法优化,这也是为什么循环生成的节点需要一个 key 属性，一方面为了重复利用已经生成的 dom,提高效率；另一方面，便于双循环比较。
  - patch 的过程是实时更新 dom 的，只要侦听到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。如果同一个 watcher 被多次触发，只会被推入到队列中一次，而 vue 中批量更新的实现是通过浏览器微任务（Promise.resolve().then()）实现的
  - 概念：Observer：执行数据响应化；Compile：编译模板，初始化视图，收集依赖（更新函数、watcher 创建）；Watcher：执行更新函数（更新 dom）；Dep：管理多个 Watcher，批量更新

## Virtual DOM 真的比操作原生 DOM 快吗？

- 这是一个性能 vs. 可维护性的取舍。框架的意义在于为你掩盖底层的 DOM 操作，让你用更声明式的方式来描述你的目的，从而让你的代码更容易维护。没有任何框架可以比纯手动的优化 DOM 操作更快，因为框架的 DOM 操作层需要应对任何上层 API 可能产生的操作，它的实现必须是普适的。框架给你的保证是，你在不需要手动优化的情况下，我依然可以给你提供过得去的性能。
- Virtual DOM render + diff 显然比渲染 html 字符串要慢，和 DOM 操作比起来，js 计算是极其便宜的。这才是为什么要有 Virtual DOM：它保证了不管你的数据变化多少，每次重绘的性能都可以接受

## Vue 的响应式原理中 Object.defineProperty 有什么缺陷

- Object.defineProperty 无法监控到数组下标的变化，导致通过数组下标添加元素，不能实时响应；
- Object.defineProperty 只能劫持对象的属性，从而需要对每个对象，每个属性进行遍历，如果，属性值是对象，还需要深度遍历。Proxy 可以劫持整个对象，并返回一个新的对象。
- vue2 解决:以 vue 中采取的策略是拦截 push()、pop()、shift()、unshift()、splice()、sort()、reverse()这些方法并通知 dep
- Proxy 不仅可以代理对象，还可以代理数组。还可以代理动态增加的属性。

## Vue 的父组件和子组件生命周期钩子执行顺

- 首次加载过程:父 beforeCreate -> 父 created -> 父 beforeMount -> 子 beforeCreate -> 子 created -> 子 beforeMount ->
  子 mounted -> (子 activated) -> 父 mounted
- 父组件更新过程:父 beforeUpdate -> (子 deactivated) -> 父 updated
- 子组件更新过程:父 beforeUpdate -> 子 beforeUpdate -> 子 updated -> 父 updated
- 销毁过程:父 beforeDestroy-> 子 beforeDestroy -> 子 destroyed -> 父 destroyed

## vue 如何优化首页的加载速度

- 使用首屏 SSR + 跳转 SPA 方式来优化，代码拆分，code split、动态 import
- 改单页应用为多页应用，需要修改 webpack 的 entry
- 改成多页以后使用应该使用 prefetch 的就使用
- 处理加载的时间片，合理安排加载顺序，尽量不要有大面积空隙
- 使用 Quicklink、CDN 资源、骨架屏、web worker 优化一些计算

## Vue 中的 computed 是如何实现的

实质是一个惰性的 watcher，在取值操作时根据自身标记 dirty 属性返回上一次计算结果/重新计算值 在创建时就进行一次取值操作，收集依赖变动的对象/属性(将自身压入 dep 中) 在依赖的对象/属性变动时，仅将自身标记 dirty 致为 true

## v-if、v-show、v-html 的原理是什么

- v-if 会调用 addIfCondition 方法，生成 vnode 的时候会忽略对应节点，render 的时候就不会渲染；
- v-show 会生成 vnode，render 的时候也会渲染成真实节点，只是在 render 过程中会在节点的属性中修改 show 属性值，也就是常说的 display；
- v-html 会先移除节点下的所有节点，调用 html 方法，通过 addProp 添加 innerHTML 属性，归根结底还是设置 innerHTML 为 v-html 的值

## vue 组件通信方式

- props 、 自定义事件、事件总线、 vuex、$parent/$root、$children、$attrs/\$listeners、provide/inject

## vue-router 基本原理

- 作为一个插件存在：实现 VueRouter 类和 install 方法，$router 实例化的时候会在其构造函数中将 location相关的值做响应式的处理。Vue.use（Router） 通过通过插件的形式把 $router 注入到了整个应用中(挂载到 Vue.prototype)，router-veiw 通过属性的方式获取到\$router 的相关属性，根据 location 的变化动态匹配对应的组件。

```
let Vue; // 引用构造函数，VueRouter中要使用 // 保存选项
class VueRouter {
  constructor(options) {
    this.$options = options;
  }
}
// 插件：实现install方法，注册$router
VueRouter.install = function(_Vue) {
  // 引用构造函数，VueRouter中要使用
  Vue = _Vue;
  Vue.mixin({
    beforeCreate() { // 只有根组件拥有router选项
      if (this.$options.router) { // vm.$router
        Vue.prototype.$router = this.$options.router;
      }
    }
  });
};
export default VueRouter;
```

- 实现两个全局组件：router-view 用于显示匹配组件内容，router-link 用于跳转
- 监控 url 变化：监听 hashchange 或 popstate 事件
- 响应最新 url：创建一个响应式的属性 current，当它改变时获取对应组件并显示

## vuex 原理解析

- 实现一个插件：声明 Store 类，挂载\$store

```
let Vue;
class Store {
  constructor(options = {}) {
    this._vm = new Vue({ data: { $$state:options.state } });
  }
  get state() { return this._vm._data.$$state }
  set state(v) { console.error('please use replaceState to reset state'); }
}
function install(_Vue) {
  Vue = _Vue;
  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store;
      }
    }
  });
}
export default { Store, install };
```

- 实现 commit 根据用户传入 type 执行对应 mutation
- 实现 dispatch 根据用户传入 type 执行对应 action，同时传递上下文
- 实现 getters，按照 getters 定义对 state 做派生

## vue-ssr 原理

- 首先，配置 vue.config.js，生成对应的 client 及 server 端的 bundle 清单文件
- 宿主文件
  ``<body> <!--vue-ssr-outlet--> </body>`
- 服务器启动文件

```
// 加载本地文件
const fs = require("fs");
// 处理url
const path = require("path");
const express = require('express')
const server = express()
const resolve = dir => { return path.resolve(__dirname, dir) }
// 处理favicon
const favicon = require('serve-favicon')
server.use(favicon(path.join(__dirname, '../public', 'favicon.ico')))
// 第 1 步：开放dist/client目录，关闭默认下载index页的选项，不然到不了后面路由
server.use(express.static(resolve('../dist/client'), {index: false}))
// 第 2 步：获得一个createBundleRenderer
const { createBundleRenderer } = require("vue-server-renderer");
// 第 3 步：导入服务端打包文件
const bundle = require(resolve("../dist/server/vue-ssr-server-bundle.json"));
// 第 4 步：根据清单及宿主文件创建渲染器
const template = fs.readFileSync(resolve("../public/index.html"), "utf-8")
const clientManifest = require(resolve("../dist/client/vue-ssr-client- manifest.json"));
const renderer = createBundleRenderer(bundle,
    { runInNewContext: false, // https://ssr.vuejs.org/zh/api/#runinnewcontext
    template, // 宿主文件
    clientManifest // 客户端清单
});
server.get('*', async (req,res)=>{ console.log(req.url);
// 设置url和title两个重要参数,构建context
const context = { title:'ssr test', url:req.url // 首屏地址 }
// 内部会调用entry-server.js的逻辑将context 传递
const html = await renderer.renderToString(context); res.send(html) })
server.listen(3000, function() {console.log(`server started at localhost:${port}`);});`
```

- app.js 应用程序入口文件,工厂函数生成 vue vue-router 以及 vuex

```
// app.js
import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'

export function createApp (context) {
  // 创建 router 实例
  const router = createRouter()
  const app = new Vue({
    // 注入 router 到根 Vue 实例
    router,
    context,
    render: h => h(App)
  })

  // 返回 app 和 router
  return { app, router }
}
```

- entry-server.js 服务器端路由逻辑,用于首屏内容渲染

```
// entry-server.js
import { createApp } from './app'

export default context => {
  // 因为有可能会是异步路由钩子函数或组件，所以我们将返回一个 Promise，
  // 以便服务器能够等待所有的内容在渲染前，
  // 就已经准备就绪。
  return new Promise((resolve, reject) => {
    const { app, router } = createApp()
    // 设置服务器端 router 的位置
    router.push(context.url)
    // 等到 router 将可能的异步组件和钩子函数解析完
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      // 匹配不到的路由，执行 reject 函数，并返回 404
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }
      // 整合vuex
      Promise.all( matchedComponents.map(Component => {
        if (Component.asyncData) {
          return Component.asyncData({ store, route: router.currentRoute, });
          }
        })
      )
      .then(() => {
        // 将状态附加到上下文，且 `template` 选项用于 renderer 时， // 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。 context.state = store.state;
        resolve(app); })
      .catch(reject);
    }, reject)
  })
}
```

- entry-client.js 客户端入口,用于静态内容“激活”

```
import { createApp } from "./main";
// 创建vue、router实例
 const { app, router } = createApp();
 // 路由就绪，执行挂载
 if (window.__INITIAL_STATE__) { store.replaceState(window.__INITIAL_STATE__); }
 router.onReady(() => { app.$mount("#app"); });
```
