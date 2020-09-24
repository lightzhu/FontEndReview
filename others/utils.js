function promisify(fn) {
  return function (...arguments) {
    return new Promise((resolve, reject) => {
      fn.apply(null, [...arguments, function (err, data) {
        err ? reject(err) : resolve(data)
      }])
    })
  }
}
function co(gen) {
  let it = gen()
  return new Promise(function (resolve, reject) {
    !function go(lastValue) {
      let { value, done } = it.next(lastValue)
      if (done) {
        resolve(value)
      } else {
        value.then(go, reject)
      }
    }()
  })
}
/* async await 是 Generator 的一种表现形式*/
function asyncAwait(gen) {
  return co(gen)
}
exports.promisify = promisify
exports.co = co
exports.asyncAwait = asyncAwait