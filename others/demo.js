const { co, asyncAwait } = require('../utils')
function promiseFn(d) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve(d)
    }, 3000)
  })
}
function* gen() {
  let a = yield promiseFn(1)
  console.log(a)
  let b = yield promiseFn(2)
  console.log(b)
  let c = yield promiseFn(3)
  console.log(c)
}
co(gen)
asyncAwait(gen)