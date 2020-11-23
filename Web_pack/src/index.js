import './index.css'
import './css/index.less'
import pick from './img/pick.png'
import 'babel-polyfill' // 用于ES6的语法
import './js/request'
import './app.jsx'
console.log(pick)
const a = 'ssadad'
console.log('webpack项目启动')
let box = document.querySelector(".box")
function component() {
  var element = document.createElement('div');
  // element.setAttribute('class', less.pink)
  let img = new Image()
  img.src = pick
  element.innerHTML = ['Hello', 'webpack'].join('--');
  element.appendChild(img)
  return element;
}
box.appendChild(component());
let btn = document.querySelector("#add")
let ul = document.querySelector("#ul")
btn.addEventListener('click', () => {
  let li = document.createElement('li')
  li.innerHTML = 'lilili'
  ul.appendChild(li)
})
