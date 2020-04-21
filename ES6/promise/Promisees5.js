const PENDING = 'pending';//初始态
const FULFILLED = 'fulfilled';//初始态
const REJECTED = 'rejected';//初始态
function Promise(executor) {
  let self = this;//先缓存当前promise实例
  self.status = PENDING;//设置状态
  //定义存放成功的回调的数组
  self.onResolvedCb = [];
  //定义存放失败回调的数组
  self.onRejectedCb = [];
  function resolve(value) {
    if (value != null && value.then && typeof value.then == 'function') {
      return value.then(resolve, reject);
    }
    //如果是初始态，则转成成功态
    //为什么要把它用setTimeout包起来
    setTimeout(function () {
      if (self.status == PENDING) {
        self.status = FULFILLED;
        self.value = value;//成功后会得到一个值，这个值不能改
        //调用所有成功的回调
        self.onResolvedCb.forEach(cb => cb(self.value));
      }
    })

  }
  function reject(reason) { //2.1.2
    setTimeout(function () {
      //如果是初始态，则转成失败态
      if (self.status == PENDING) {
        self.status = REJECTED;
        self.value = reason;//失败的原因给了value
        self.onRejectedCb.forEach(cb => cb(self.value));
      }
    });

  }
  try {
    //因为此函数执行可能会异常，所以需要捕获，如果出错了，需要用错误 对象reject
    executor(resolve, reject);
  } catch (e) {
    reject(e);
  };
}
// function resolvePromise(promise2, x, resolve, reject) {
//   if (promise2 === x) {
//     return reject(new TypeError('循环引用'));
//   }
//   let called = false;//promise2是否已经resolve 或reject了
//   if (x instanceof Promise) {
//     if (x.status == PENDING) {
//       x.then(function (y) {
//         resolvePromise(promise2, y, resolve, reject);
//       }, reject);
//     } else {
//       x.then(resolve, reject);
//     }
//     //x是一个thenable对象或函数，只要有then方法的对象，
//   } else if (x != null && ((typeof x == 'object') || (typeof x == 'function'))) {
//     //当我们的promise和别的promise进行交互，编写这段代码的时候尽量的考虑兼容性，允许别人瞎写
//     try {
//       let then = x.then;
//       if (typeof then == 'function') {
//         //有些promise会同时执行成功和失败的回调
//         then.call(x, function (y) {
//           //如果promise2已经成功或失败了，则不会再处理了
//           if (called) return;
//           called = true;
//           resolvePromise(promise2, y, resolve, reject)
//         }, function (err) {
//           if (called) return;
//           called = true;
//           reject(err);
//         });
//       } else {
//         //到此的话x不是一个thenable对象，那直接把它当成值resolve promise2就可以了
//         resolve(x);
//       }
//     } catch (e) {
//       if (called) return;
//       called = true;
//       reject(e);
//     }

//   } else {
//     //如果X是一个普通 的值，则用x的值去resolve promise2
//     resolve(x);
//   }
// }
//onFulfilled 是用来接收promise成功的值或者失败的原因
Promise.prototype.then = function (onFulfilled, onRejected) {
  //如果成功和失败的回调没有传，则表示这个then没有任何逻辑，只会把值往后抛
  onFulfilled = typeof onFulfilled == 'function' ? onFulfilled : function (value) { return value };
  onRejected = typeof onRejected == 'function' ? onRejected : reason => { throw reason };
  //如果当前promise状态已经是成功态了，onFulfilled直接取值
  let self = this;
  let promise2;
  if (self.status == FULFILLED) {
    let x = onFulfilled(self.value)
    // return promise2 = new Promise(function (resolve, reject) {
    //   setTimeout(function () {
    //     try {
    //       let x = onFulfilled(self.value);
    //       //如果获取到了返回值x,会走解析promise的过程
    //       resolvePromise(promise2, x, resolve, reject);
    //     } catch (e) {
    //       //如果执行成功的回调过程中出错了，用错误原因把promise2 reject
    //       reject(e);
    //     }
    //   })
    // });
  }
  if (self.status == REJECTED) {
    let x = onRejected(self.reason)
    // return promise2 = new Promise(function (resolve, reject) {
    //   setTimeout(function () {
    //     try {
    //       let x = onRejected(self.value);
    //       resolvePromise(promise2, x, resolve, reject);
    //     } catch (e) {
    //       reject(e);
    //     }
    //   })
    // });
  }
  if (self.status == PENDING) {
    self.onResolvedCb.push(function () {
      let x = onFulfilled(self.value)
    })
    self.onResolvedCb.push(function () {
      let x = onRejected(self.reason)
    })
    // return promise2 = new Promise(function (resolve, reject) {
    //   self.onResolvedCallbacks.push(function () {
    //     try {
    //       let x = onFulfilled(self.value);
    //       //如果获取到了返回值x,会走解析promise的过程
    //       resolvePromise(promise2, x, resolve, reject);
    //     } catch (e) {
    //       reject(e);
    //     }

    //   });
    //   self.onRejectedCallbacks.push(function () {
    //     try {
    //       let x = onRejected(self.value);
    //       resolvePromise(promise2, x, resolve, reject);
    //     } catch (e) {
    //       reject(e);
    //     }
    //   });
    // });
  }
}

module.exports = Promise;


