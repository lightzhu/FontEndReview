import axios from 'axios'
axios.get('/api/getInfo')
  .then(res => {
    console.log(res)
  })
let ul = document.querySelector("#ul")
axios.get('/api/list')
  .then(res => {
    let list = res.data.data
    let str = list.map(item => `<li>${item}ss2</li>`)
    console.log(str)
    ul.innerHTML = str.join('')
  })

let asyncFn = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(100)
  }, 3000);
})
asyncFn.then(res => {
  console.log(res)
})
