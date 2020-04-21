const myPromise = require('./Promise')
// const myPromise = require('./Promisees5')
console.log(myPromise)
let p1 = new myPromise((resolve, reject) => {
  setTimeout(() => {
    let num = Math.random()
    if (num < .5) {
      resolve(num)
    } else {
      reject('error')
    }
  }, 0)
})
p1.then(function (data) {
  console.log(data + '1')
}, function (error) {
  console.log(error + '2')
})