// 聚合函数
function add(a, b) {
  return a + b
}
function square(c) {
  return c * c
}
// function compose(fn1, fn2) {
//   return (...args) => fn2(fn1(...args))
// }

function compose(...fns) {
  return fns.reduce((a, b) => (...args) => b(a(...args)))
}

let newFn = compose(add, square)
console.log(newFn(2, 3))

function middleware(middlewares) {
  function dispatch(i) {
    let fn = middlewares[i]
    if (!fn) {
      return Promise.resolve()
    }
    return Promise.resolve(
      fn(function next() {
        return dispatch(i + 1)
      })
    )
  }
  return function () {
    return dispatch(0)
  }
}
async function fn1(next) {
  console.log('fn1 start')
  await next()
  console.log('fn1 end')
}
async function fn2(next) {
  console.log('fn2 start')
  await next()
  console.log('fn2 end')
}
function fn3(next) {
  console.log('fn3 start')
}
let finalFn = middleware([fn1, fn2, fn3])
finalFn()