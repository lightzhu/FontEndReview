<h1 align="center">前端面试</h1>

- 说下 prototype 和 `__proto__`的关系

  <div>
  所有对象都具有属性__proto__，可称为隐式原型，一个对象的隐式原型指向构造该对象的构造函数的原型，这也保证了实例能够访问在构造函数原型中定义的属性和方法。
  prototype 是构造函数才有，它指向的是当前对象的原型对象，也称为显式原型，用来实现基于原型的继承与属性的共享；所有对象都有__proto__，构造函数实例化对象的__proto__指向与构造函数的 prototype 指向相同,也称为隐式原型，构成原型链，在原型链中，当我们访问 obj 这个对象中的 x 属性时，如果在 obj 中找不到，那么就会沿着__proto__依次查找，__proto__会一直找到 Object.prototype.__proto__=null 原型链的终点。
  </div>

- 说一下 escape、encodeURI、encodeURIComponent 有什么区别？具体的使用场景？

  <div>escape()不能直接用于 URL 编码，它的真正作用是返回一个字符的 Unicode 编码值;encodeURI()是 Javascript 中真正用来对 URL 编码的函数。
  它用于对 URL 的组成部分进行个别编码，除了常见的符号以外，对其他一些在网址中有特殊含义的符号"; / ? : @ & = + $ , #"，也不进行编码;与encodeURI()的区别是，它用于对整个 URL 进行编码。"; / ? : @ & = + $ , #"，这些在encodeURI()中不被编码的符号，在encodeURIComponent()中统统会被编码</div>

- 有没有写过 Koa 中间件，说下中间件原理，介绍下自己写过的中间件
  <div>
  中间件的执行顺序并不是从头到尾，而是类似于前端的事件流。事件流是先进行事件捕获，到达目标，然后进行事件冒泡。中间件的实现过程也是一样的，先从最外面的中间件开始执行，next() 后进入下一个中间件，一路执行到最里面的中间件，然后再从最里面的中间件开始往外执行。
  Koa 中间件采用的是洋葱圈模型，每次执行下一个中间件传入两个参数 ctx 和 next，参数 ctx 是由 koa 传入的封装了 request 和 response 的变量，可以通过它访问 request 和 response，next 就是进入下一个要执行的中间件。
  </div>

```
// 日志中间件
const fs = require('fs');
module.exports = (options) => async (ctx,next){
    const startTime = Date.now();
    const requestTime = new Date();
    await next();
    const ms = Date.now - startTime;
    let logout = `${ctx.request.ip}--${requestTime}--${ctx.method}--${ctx.url}--${ms}ms`;
    // 输出日志文件
    fs.appendFileSync('./log.txt',logout + '\n');
}
```
