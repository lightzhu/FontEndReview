/*
每个实例对象（ object ）都有一个私有属性（称之为 __proto__ ）指向它的构造函数的原型对象（prototype ）。
该原型对象也有一个自己的原型对象( __proto__ ) ，层层向上直到一个对象的原型对象为 null。
*/
// 1.所有构造器/函数的__proto__都指向Function.prototype，它是一个空函数（Empty function）
Number.__proto__ === Function.prototype  // true
Boolean.__proto__ === Function.prototype // true
String.__proto__ === Function.prototype  // true
Array.__proto__ === Function.prototype   // true
RegExp.__proto__ === Function.prototype  // true
Error.__proto__ === Function.prototype   // true
Date.__proto__ === Function.prototype    // true
Object.__proto__ === Function.prototype  // true
Function.__proto__ === Function.prototype // true

// Math，JSON是以对象形式存在的，无需new
Math.__proto__ === Object.prototype  // true
JSON.__proto__ === Object.prototype  // true

// 自定义对象
function Person() { }
Person.__proto__ === Function.prototype // true
// 所有实例的__proto__都>>其构造函数的原型对象（prototype ）
let person = new Person()
// person.__proto__ === Person.prototype
console.log(Person)
console.log(Person.__proto__)
console.log(Person.prototype.__proto__ === Object.prototype)
console.log(Person.prototype.constructor)
//  这里是最奇怪的
console.log(Person.prototype.constructor === person.constructor)
console.log(person.__proto__ === Person.prototype)

// 所有构造函数的__proto__都是Function.prototype，那Function.prototype的__proto__
Function.prototype.__proto__ === Object.prototype// true
Object.prototype.__proto__ === null // true

