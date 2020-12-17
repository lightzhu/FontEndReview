// 创建对象的方式
// 1.对象字面量
var obj = { name: 'foo' }  // 类似obj= {};
// 2.new 
var obj1 = new Object({ name: 'foo' })
console.log(obj1.name)
//3.工厂模式
function createObj(name) {
  var obj2 = new Object()
  obj.name = name
  return name
}
// 4.构造函数 问题：方法不能共享
function Myobject(name) {
  this.name = name
  this.eat = function () { }
}
let obj3 = new Myobject('foo')
//5.原型模式 问题：原型上的属性共享了
function Myobject1() { }
Myobject1.prototype.name = 'foo'
let obj4 = new Myobject1()
// 6. 构造函数+原型
function Animal(name) {
  this.name = name;
  this.friends = ['dog', 'cat'];
}
Animal.prototype.sayName = function () {
  alert(this.name);
};