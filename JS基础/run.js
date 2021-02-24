const obj = { getArrow() { return () => { console.log(this === obj); }; } }
obj.getArrow()
this.a = 20
var t = {
  a: 30,
  init: {
    a: 40,
    log: () => {
      console.log(this.a)
    }
  }
}
t.init.log()