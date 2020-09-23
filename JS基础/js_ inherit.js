// 1.原型链继承
function Animal(name) {
  this.name = name;//属性
  this.sleep = function () {//实例方法
    console.log(this.name + '正在睡觉')
  }
}
//原型方法
Animal.prototype.eat = function (food) {
  console.log(this.name + '正在吃' + food)
};
//原型链继承---核心：将父类的实例作为子类的原型
function Cat() {
}
Cat.prototype = new Animal();

// 2.借用构造函数继承
/**
 * 只能使用父类的属性和方法 不能继承原型属性和方法 所以cat不能使用eat方法
 * **/
function Animal(name) {
  this.name = name;//属性
  this.sleep = function () {//实例方法
    console.log(this.name + '正在睡觉！');
  }
}
// 原型方法
Animal.prototype.eat = function (food) {
  console.log(this.name + '正在吃：' + food);
};
function Cat(name) {
  Animal.call(this, name);
}
var cat = new Cat('Tom');

// 3.组合继承
function Animal(name) {
  this.name = name;
  this.sleep = function () {
    console.log(this.name + "正在睡觉");
  };
}
Animal.prototype.eat = function (food) {
  console.log(this.name + "正在吃" + food);
}
function Cat(name) {
  Animal.call(this, name)
}
Cat.prototype = new Animal();
Cat.prototype.constructor = Cat;//修复构造函数指向

// 4.寄生组合继承
function Animal(name) {
  this.name = name;
  this.sleep = function () {
    console.log(this.name + "正在睡觉");
  }
}
// 原型方法
Animal.prototype.eat = function (food) {
  console.log(this.name + '正在吃：' + food);
};
function Cat(name) {
  Animal.call(this, name);
}
//  (function () {
//创建一个没有实例方法的类
function Super() { };
Super.prototype = Animal.prototype;//eat
Cat.prototype = new Super();//一般 的话是new Animal（）
Cat.prototype.constructor = Cat;//Cat的构造器还是Cat