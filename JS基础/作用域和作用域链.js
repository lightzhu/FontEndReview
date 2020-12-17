var get = function () {
  console.log('get')
}
function get() {
  console.log('fn get')
}
get() // get  函数提升，变量提升，赋值在后面ß