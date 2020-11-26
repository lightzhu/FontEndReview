let obj = {
  name: 'bob'
}
function ln() {
  console.log(this.name)
  console.log(arguments)
}
ln()
Function.prototype.$call = function (context, ...args) {
  context = context || window
  context.fn = this // this指向call的对象
  var result = context.fn(...args)
  delete context.fn
  return result
}
// test
ln.$call(obj)

Function.prototype.$apply = function (_this, args) {
  const fun = Symbol('fun')
  _this = _this || window
  console.log(_this)
  _this[fun] = this
  var result2
  if (args && args.length) {
    result2 = _this[fun](...args)
  } else {
    result2 = _this[fun]()
  }
  delete _this[fun]
  return result2
}
// test
ln.$apply(obj)
Function.prototype.$bind = function (that) {
  if (typeof this !== 'function') {
    throw new TypeError('应该是个函数')
  }
  // var args =Array.prototype.slice.call(arguments,1)
  // or
  var args = Array.from(arguments)
  var that = args.shift()
  console.log(args)
  var self = this
  var fbound = function () {
    self.apply(this instanceof self ? this : that, args.concat(Array.prototype.slice.call(arguments)))
  }
  return fbound
}
// test
ln.$bind(obj, '1', '2')

// 防抖函数:短时间内大量触发同一事件，只会执行一次函数，设置一个定时器，约定在xx毫秒后再触发事件处理
function debounce(fn, delay) {
  let timer = null
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}
//节流函数:每隔一段时间就执行一次
function throttle(fn, delay) {
  let timer = null
  return () => {
    let args = Array.from(arguments)
    if (!timer) {
      timer = setTimeout(() => {
        timer = null
        fn.apply(this, args)
      }, delay)
    }
  }
}
