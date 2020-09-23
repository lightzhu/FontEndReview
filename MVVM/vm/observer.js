class Observer {
  constructor(data) {
    this.observe(data)
  }
  observe(data) {
    // 把实例里的数据改成get和set的形式，defineProperty
    if (!data || typeof data !== "object") {
      return;
    }
    Object.keys(data).forEach(key => {
      //劫持
      this.defineReactive(data, key, data[key]);
      this.observe(data[key]); //深度递归劫持
    })
  }
  /* 定义响应式 */
  defineReactive(obj, key, value) {
    let that = this;
    let dep = new Dep();//每个变化的数据 都会对应一个数组，这个数组是存放所有更新的操作
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() { //取值的时候调用的方法
        Dep.target && dep.subscribe(Dep.target)
        return value;
      },
      set(newValue) { //当给data属性中设置值得时候  更改获取属性的值
        if (newValue != value) {
          that.observe(newValue);/* 如果是对象 继续劫持 */
          value = newValue;
          dep.notify(); //通知所有人 数据更新了
        }
      },
    })
  }
}
class Dep {
  constructor() {
    //订阅的数组
    this.subs = [];
  }
  subscribe(watcher) {
    this.subs.push(watcher);
  }
  notify() {
    this.subs.forEach(watcher => watcher.update());
  }
}