let obj = {
  name: 'bob'
}
function ln() {
  console.log(this.name)
  console.log(arguments)
}
ln()
/* call手写 */
Function.prototype.$call = function (context, ...args) {
  context = context || window
  context.fn = this // this指向call的对象
  var result = context.fn(...args)
  delete context.fn
  return result
}
// test
ln.$call(obj)
/* apply手写 */
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
/* bind手写 */
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

/* 防抖函数:短时间内大量触发同一事件，只会执行一次函数，设置一个定时器，约定在xx毫秒后再触发事件处理 */
function debounce(fn, delay) {
  let timer = null
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}
/* 节流函数:每隔一段时间就执行一次 */
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
/* 实现加法，不使用运算符 */
function addTwo(a, b) {
  if (a === 0) return b;
  if (b === 0) return a;
  const res = a ^ b;
  return addTwo(res, (a & b) << 1);
}
/* 函数柯里化，curry的意义在于能够在不完全指定函数参数的情况下运行函数 */
function curry(fn) {
  const ctx = this;
  function inner(...args) {
    if (args.length === fn.length) {
      return fn.call(ctx, ...args)
    }
    return (...innerArgs) => {
      return inner.call(ctx, ...args, ...innerArgs)
    }
  }
  return inner
}
// test
function test(a, b, c) {
  console.log(a, b, c);
}
const f1 = curry(test)(1);
const f2 = f1(2);
f2(3);
/* 聚合函数(reduce), compose接受多个函数作为参数，并返回一个新的函数 */
function compose(...fns) {
  return (...rest) => fns.reduceRight((acc, next) => {
    return next(acc(rest))
  })
}
function a(msg) {
  return msg + "a";
}
function b(msg) {
  return msg + "b";
}
const f = compose(a, b);
console.log(f("hello"));
/* 对象深拷贝，递归 */
function deepCopy(obj) {
  if (typeof obj != 'object') return obj
  let object = null
  if (Array.isArray(obj)) {
    object = new Array()
    obj.forEach((item, key) => {
      object[key] = deepCopy(item)
    })
  } else {
    object = {}
    Object.keys(obj).forEach(key => {
      object[key] = deepCopy(obj[key])
    })
  }
  return object
}
// test
const a = {
  a: [
    1,
    [4],
    {
      a: {
        c: [4]
      }
    }
  ]
}
const b = deepCopy(a);
console.log(b)
/* 数组扁平化，flatten */
function flatten(list) {
  if (list.length === 0) return []
  let head = list[0]
  if (head instanceof Array) {
    list[0] = flatten(head)
  } else {
    list[0] = [list[0]]
  }
  return list[0].concat(flatten(list.slice(1)))
}
/* 给定url的查询字符串中,getUrlParams */
function getUrlParams(str) {
  let query = str.split('?')
  let params = {}
  if (query.length <= 1) return params
  let queryArr = query[1].split('&')
  queryArr.forEach((value, index) => {
    let arr = value.split('=')
    let key = arr[0]
    params[key] = arr[1]
  })
  return params
}
console.log(getUrlParams("http://lucifer.ren?a=1&b=2"))
/* 判断链表是否有环，两个指针，一快一慢，如果有环最终会相等 */
function hasCycle(head) {
  if (head === null || head.next === null) return false
  let fast = head.next
  let slow = head
  while (fast && fast.next) {
    if (fast === head) return true
    slow = slow.next
    fast = fast.next && fast.next.next
  }
  return false
}
/* 数组随机排序 */
function sortRandom() {
  return Math.random() > 0.5 ? -1 : 1
}
let arr = [1, 2, 3, 4, 5, 6]
console.log(arr.sort(sortRandom()))

/* 聚合函数compose实现 */
const compose = function (...fns) {
  let len = fns.length
  let result = null
  let index = len - 1
  return function fn(args) {
    result = fns[index].call(this, args)
    if (index > 0) {
      index--
      fn.call(null, result)
    }
    return result
  }
}

function compose2(...fns) {
  let isFirst = true;
  return (...args) => {
    return fns.reduceRight((result, fn) => {
      if (!isFirst) return fn(result);
      isFirst = false;
      return fn(...result);
    }, args);
  };
}
const greeting = (name) => `hello ${name}`;
const toUpper = (str) => str.toUpperCase();
const fun = compose2(toUpper, greeting);
console.log(fun("yideng"));

/* 模拟实现 Object.freeze */
function myFreeze(obj) {
  // 判断参数是否为Object类型
  if (obj instanceof Object) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        Object.defineProperty(obj, key, {
          writable: false, // 设置只读
        });
        Object.seal(obj); // 封闭对象
      }
    }
  }
  return obj;
}
/* Reduce实现 */
Array.prototype.myReduce = function (fn, initialValue) {
  if (this.length === 0) {
    if (initialValue === undefined) {
      console.error("reduce of empty array with no initialValue")
    } else {
      return initialValue
    }
  } else {
    var prev = initialValue !== undefined ? initialValue : this[0]
    var startIndex = initialValue !== undefined ? 0 : 1
    for (var i = startIndex; i < this.length; i++) {
      prev = fn(prev, this[i])
    }
    return prev
  }
}
var arr1 = [1, 2, 3, 4]
var res = arr1.myReduce(function (sum, item) {
  return sum + item
}, 1)
console.log(res);
/* promise封装ajsx */
const promiseAjax = function (data) {
  function formatParams(param) {
    var arr = [];
    for (var name in param) {
      arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(param[name]));
    }
    arr.push(("v=" + Math.random()).replace(".", ""));
    return arr.join("&");
  }
  if (!data) data = {}
  data.params = data.params || {}

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    if (data.type === 'get') {
      data.params = formatParams(data.params); //options.data请求的数据

      xhr.open("GET", data.url + "?" + data.params, true);
      xhr.send(null);
    } else if (options.type == "post") {
      xhr.open("POST", data.url, true);
      xhr.setRequestHeader("Content-type", "application/json");
      xhr.send(data.params);
    }

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status === 200) {
          resolve(xhr.response)
        } else {
          reject(xhr.responseText);
        }
      }
    }
  })
}