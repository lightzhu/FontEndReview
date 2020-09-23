// const myPromise = require('./Promise')
const myPromise = require('./Promisees5')
let p1 = new myPromise(function (resolve, reject) {
  setTimeout(() => {
    let num = Math.random()
    console.log(num)
    if (num < .5) {
      resolve('ok' + num)
    } else {
      reject('error' + num)
    }
  }, 1000)
})
p1.then(function (data) {
  console.log(data + '1')
}, function (error) {
  console.log(error + '2')
})