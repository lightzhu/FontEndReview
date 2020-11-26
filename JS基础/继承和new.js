/* 实现继承 */
function _extend(child, parent) {
  Object.setPrototypeOf(child, parent)
  function _() {
    this.constructor = child
  }
  child.prototype = parent === null ? Object.create(parent) : ((_.prototype = parent.prototype), new _())
}
function B(opt) {
  console.log(opt)
  this.name = opt.name;
}

function A(opt) {
  console.log(opt)
  B.call(this, opt)
}
_extend(A, B);
// test
const a = new A({ name: 'tt' });
console.log(a.name, a.constructor, a.__proto__);



/* 实现new */
function _new() {
  var obj = new Object()
  var Constructor = Array.prototype.shift.call(arguments)
  console.log(Constructor)
  obj.__proto__ = Constructor.prototype
  var tem = Constructor.apply(obj, arguments)
  return typeof tem === 'object' && tem !== null ? tem : obj
}
// test
function AA(name) {
  this.name = name
}
AA.prototype.say = function () {
  console.log('say')
}
let aa = _new(AA, 'foo')
console.log(aa.name)

/* Object.create 的基本实现原理 */
function _createClass(propotype, props) {
  if (typeof propotype !== 'object') {
    throw TypeError()
  }
  function Ctor() { }
  Ctor.prototype = propotype
  var ctor = new Ctor()
  if (props != undefined) {
    if (props !== Object(props)) {
      throw TypeError()
    }
    Object.defineProperty(ctor, props)
  }
  return ctor
}
function C() { }
C.prototype = _createClass(AA.prototype)

C.prototype.Constructor = C
let c = new C()
c.say()
console.log(c instanceof C)
console.log(C.prototype instanceof AA)


/* 深拷贝 */
function deepCopy(origin) {
  let type = types(origin)
  switch (type) {
    case 'array':
      return copyArray(origin);
    case 'object':
      return copyObject(origin);
    case 'function':
      return copyFunction(origin);
    default:
      return origin
  }
}
function copyArray(ori, copy = []) {
  for (let index in ori) {
    copy[index] = deepCopy(ori[index]);
  }
  return copy;
}

function copyObject(ori, copy = {}) {
  for (const [key, value] of Object.entries(ori)) {
    copy[key] = deepCopy(value);
  }
  return copy;
}

function copyFunction(ori) {
  const fun = eval(ori.toString());
  fun.prototype = ori.prototype
  return fun
}


function types(obj) {
  let type = Object.prototype.toString.call(obj)
  let maps = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  }
  return maps[type]
}

let f = {
  k: [1, 2, 3, 4],
  g: {
    l: 0,
    o: ['1', '2', '3']
  }
}
let fl = deepCopy(f)
fl.p = 'p'
fl.g.o[2] = 0
console.log(f, fl)