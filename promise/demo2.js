const myPromise = require('./Promisees5')
let p1 = new myPromise(function (resolve, reject) {
  setTimeout(() => {
    let num = Math.random()
    resolve(num)
    // if (num < .5) {
    //   resolve('ok' + num)
    // } else {
    //   reject('error' + num)
    // }
  }, 1000)
})
let p2 = new myPromise(function (resolve, reject) {
  setTimeout(() => {
    let num = Math.random()
    if (num < .5) {
      resolve('ok' + num)
    } else {
      reject('error' + num)
    }
  }, 2000)
})
let p3 = new myPromise(function (resolve, reject) {
  setTimeout(() => {
    let num = Math.random()
    if (num < .5) {
      resolve('ok' + num)
    } else {
      reject('error' + num)
    }
  }, 500)
})
// myPromise.all([p1, p2]).then((data) => {
//   console.log(data)
// }, (e) => {
//   console.log(e)
// })
myPromise.race([p1, p3]).then((data) => {
  console.log(data)
}, (e) => {
  console.log(e)
})