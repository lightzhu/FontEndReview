// 简单版本的
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
class Promise {
  constructor(executor) {
    this.status = PENDING
    //初始化成功的回调
    this.onResolvedCb = []
    //初始化失败的回调
    this.onRejectedCb = []
    this.value = null
    this.reason = null
    try {
      executor(this.resolve.bind(this), this.reject.bind(this))
    } catch (e) {
      this.reject(e);
    }
  }
  resolve(value) {
    console.log(value + 'resolve')
    //如果当前状态是pending的话调用这个函数可以将状态改成fulfilled
    if (this.status == PENDING) {
      this.status = FULFILLED
      // 将获取到的值赋值给当前对象，并且让所有的成功回调函数执行
      this.value = value
      this.onResolvedCb.forEach((item) => item(value))
    }
  }
  reject(reason) {
    console.log(reason + 'reject')
    // 如果当前状态是pending的话调用这个函数可以将状态改成rejected
    if (this.status == PENDING) {
      this.status = REJECTED
      // 将原因值赋值给当前对象，并且让所有的失败的回调函数执行
      this.reason = reason
      this.onRejectedCb.forEach((item) => item(reason))
    }
  }
  then(onFulfilled, onRejected) {
    let self = this
    // 处理如果没有指定相应的回调时的情况
    onFulfilled = typeof onFulfilled == 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected == 'function' ? onRejected : reason => { throw reason };
    if (self.status === FULFILLED) {
      let x = onFulfilled(self.value)
    }
    if (self.status === REJECTED) {
      let y = onRejected(self.reason)
    }
    if (self.status === PENDING) {
      self.onResolvedCb.push(function () {
        let x = onFulfilled(self.value)
      })
      self.onRejectedCb.push(function () {
        let x = onRejected(self.reason)
      })
    }
  }
}
function resolvePromise(newPromise, x, resolve, reject) {

}
module.exports = Promise