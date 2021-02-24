# Node 题目汇总

## React SSR 实现过程？原理是什么？有什么注意事项？

- 随着越来越多的前端框架比如：react、vue 的推出，对于 SSR 又有了新的理解，现在的开发者更倾向于将其称之为“同构”，即客户端和服务端渲染的一个整合，页面的渲染在服务端完成，事件和交互的绑定在客户端完成。
- 大致的实现流程如下：node server 接收客户端请求，得到当前的请求路径，服务端和客户端使用同一套路由规则，在路由配置表根据 path 匹配具体的组件，请求对应的数据，将数据通过 props/context/store 形式传入组件，利用 react 提供的服务端渲染 api renderToString/renderToNodeStream 将组件渲染为生成带有标记的 html 字符串或者数据流，在输出最终的 html 之前，将数据注入（注水），服务端输出后，客户端就能得到组件数据（脱水），客户端利用 ReactDOM.hydrate 渲染，根据服务端携带的标记更新 React 组件树，并附加事件响应。
- 核心原理：server 端接收到客户端的请求路由后，查找对应的数据，以 props、context、store 的形式注入组件中。然后基于 react 提供的 API：renderToString 将组件转换为 html 字符串输出到客户端。客户端使用该数据进行渲染，保证数据的一致性。React SSR 之所以能够实现，本质是虚拟 DOM 的存在。判断环境是服务器环境，可以操作 JavaScript 对象，把虚拟 DOM 映射成字符串输出。判断环境是客户端环境，可以操作 JavaScript 对象，将虚拟 DOM 映射成真实 DOM ，完成页面挂载。
- 注意事项：客户端需要使用 ReactDOM.hydrate 来渲染组件；客户端路由和服务端路由的机制不同，需要在两个环境中配置路由。服务端路由需要解析 url 从而渲染对应的 html 字符串，而客户端可以自动匹配 URL 中的路由，将对应的组件渲染成 DOM；服务端执行环境没有 window 和 document 等宿主对象，且会执行组件的 constructor， componentWillReceiveProps，render 生命周期，所以务必避免代码中的此类调用。可以通过 typeof window 或 webpack.definePlugin 来对客户端和服务端做区分；服务端和客户端需要不同的 webpack 配置；store 不能是个单例，因为所有用户共享一个 store
  服务端渲染的性能关键在于是否做好缓存，但要注意缓存缓存是把双刃剑，运用不当可能会引发内存泄漏以及数据的不一致。

## Node 性能如何进监控以及优化？

监控：业务逻辑监控，硬件行为监控

- 日志监控，响应时间，进程监控，磁盘监控，cpu 占用监控，I/O 负载，网络监控，应用状态监控
  性能优化
- 动静分离，启用缓存，多进程架构，数据库读写分离
- 使用最新版 node,使用 fast-json-stringify 加速 JSON 序列化，正确编写异步代码

## 说一下事件循环机制(node、浏览器)

## 如何封装 node 中间件

## node 中间层怎样做的请求合并转发

## 是否熟悉 Node，主要做过哪些业务，平时用过什么包？

## 手动实现一个 Promisify 函数

## 介绍一下 node 核心模块（主要是 stream）

## node 如何做错误监控（运行时与其他）如何生成日志，日志等级

## Node 的适用场景以及优缺点是什么？

## koa2 和 express 区别

公司：菜鸟网络、海风教育
<br/>

## 上传文件的 Content_Type 什么，node 如何拿到上传的文件内容(不适用第三方插件)？文件内容是一次行传输过去的么

分类：Node

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/591)

<br/>

## 介绍下 pm2，pm2 依据什么重启服务

公司：阿里

分类：Node

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/565)

<br/>

## 什么是微服务，微服务跟单体应用的区别是啥，用微服务有啥好处？

分类：Node

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/564)

<br/>

## 使用过的 koa2 中间件，中间价的原理是什么

公司：阿里、宝宝树

分类：Node

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/559)

<br/>

## koa-body 原理

公司：阿里

分类：Node

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/558)

<br/>

## 有没有写过中间件，介绍下自己写过的中间件

公司：阿里

分类：Node

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/557)

<br/>

## 有没有涉及到 Cluster，说一下你的理解

公司：阿里

分类：Node

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/556)

<br/>

## master 挂了的话 pm2 怎么处理

公司：阿里

分类：Node

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/555)

<br/>

## Node 如何和 MySQL 进行通信

公司：阿里

分类：Node

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/554)

<br/>

## 服务端渲染 SSR

公司：阿里

分类：Node

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/552)

<br/>

## koa 中 response.send、response.rounded、response.json 发生了什么事，浏览器为什么能识别到它是一个 json 结构或是 html

公司：滴滴

分类：Node

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/505)

<br/>

## koa-bodyparser 如何解析 request

公司：滴滴

分类：Node

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/504)

<br/>

## pm2 怎么做进程管理，进程挂掉怎么处理

公司：挖财

分类：Node

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/465)

<br/>

## 不用 pm2 怎么做进程管理

公司：挖财

分类：Node

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/464)

<br/>

## jsonp 方案需要服务端怎么配合

公司：沪江

分类：Node

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/463)

<br/>

## node 接口转发有无做什么优化？node 起服务如何保证稳定性，平缓降级，重启等

公司：微医

分类：Node

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/597)

<br/>

## 介绍 node 文件查找优先级

公司：宝宝树

分类：Node

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/772)

<br/>

## npm2 和 npm3+有什么区别

公司：宝宝树

分类：Node

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/771)

<br/>

## Node 不支持哪些 ES6 语法

分类：Node

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/702)

<br/>

## node 如何进行跨域通信

公司：高思教育

分类：Node

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/828)

<br/>

## 介绍 koa2，原理是什么？

公司：兑吧、海风教育

分类：Node

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/419)

<br/>

## 如何对相对路径引用进行优化

公司：宝宝树

分类：Node

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/773)

<br/>
