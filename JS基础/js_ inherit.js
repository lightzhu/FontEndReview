// 1.借用构造函数继承
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
// cat.eat() // 报错

// 2.原型链继承
/* 缺点：父类中包含引用类型值的原型属性会被所有实例所共享 */
function Animal1(name) {
  this.name = name;//属性
  this.paly = [1, 2]
  this.sleep = function () {//实例方法
    console.log(this.name + '正在睡觉')
  }
}
//原型方法
Animal1.prototype.eat = function (food) {
  console.log(this.name + '正在吃' + food)
};
//原型链继承---核心：将父类的实例作为子类的原型
function Cat1() { }
Cat1.prototype = new Animal1();
{
  let cat1 = new Cat1()
  let cat2 = new Cat1()
  cat1.paly.push(2)
  console.log(cat1.paly, cat2.paly)
}

// 3.组合继承
function Animal2(name) {
  this.name = name;
  this.paly = [1, 2]
}
Animal2.prototype.eat = function (food) {
  console.log(this.name + "正在吃" + food);
}
function Cat2(name) {
  Animal2.call(this, name)
}
Cat2.prototype = new Animal2();
Cat2.prototype.constructor = Cat2;//修复构造函数指向
{
  let cat1 = new Cat2()
  let cat2 = new Cat2()
  cat1.paly.push(2)
  console.log(cat1.paly, cat2.paly)
  console.log(cat1 instanceof Cat2, cat1 instanceof Animal2);
}

// 4.寄生组合继承
function Animal3(name) {
  this.name = name;
  this.paly = [1, 2]
}
// 原型方法
Animal3.prototype.eat = function (food) {
  console.log(this.name + '正在吃：' + food);
};
function Cat3(name) {
  Animal3.call(this, name);
}
//创建一个没有实例方法的类
function Super() { };
Super.prototype = Animal3.prototype;//eat
Cat3.prototype = new Super();//一般 的话是new Animal（）
Cat3.prototype.constructor = Cat3;//Cat的构造器还是Cat
{
  let cat1 = new Cat3()
  let cat2 = new Cat3()
  cat1.paly.push(2)
  console.log(cat1.paly, cat2.paly)
  console.log(cat1 instanceof Cat3, cat1 instanceof Animal3);
}

// 5.组合继承变体
function Parent5() {
  this.name = 'parent5';
  this.play = [1, 3];
}
function Child5() {
  Parent5.call(this);
  this.type = 'child5';
}
Child5.prototype = Object.create(Parent5.prototype);
var s7 = new Child5();
var s5 = new Child5();
s5.play.push(2)
console.log(s7 instanceof Child5, s7 instanceof Parent5);
console.log(s7.constructor);
console.log(s7.play);