class Person {
  constructor(name) {
    this.age = 18
    this.name = name
  }
  say() {
    console.log('say')
  }
}
class Student extends Person {
  constructor(name, id) {
    super(name)
    this.id = id
  }
  study() {
    console.log('study')
  }
}


function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function')
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, writable: true, configurable: true },
  })
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _classCallCheck(instance, Constructor) {
  if (!_instanceof(instance, Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i]
    descriptor.enumerable = descriptor.enumerable || false
    descriptor.configurable = true
    if ('value' in descriptor) descriptor.writable = true
    Object.defineProperty(target, descriptor.key, descriptor)
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps)
  if (staticProps) _defineProperties(Constructor, staticProps)
  return Constructor
}

var Person = (function () {
  function Person(name) {
    _classCallCheck(this, Person)

    this.age = 18
    this.name = name
  }
  _createClass(Person, [
    {
      key: 'say',
      value: function say() {
        console.log('say')
      },
    },
  ])

  return Person
})()

var Student = (function (_Person) {
  _inherits(Student, _Person)
  var _super = _createSuper(Student)
  function Student(name, id) {
    _classCallCheck(this, Student)
    var _this = _possibleConstructorReturn(this, (Child.__proto__ || Object.getPrototypeOf(Child)).call(this, name));
    _this.id = id
    return _this
  }

  _createClass(Student, [
    {
      key: 'study',
      value: function study() {
        console.log('study')
      },
    },
  ])
  return Student
})(Person)
