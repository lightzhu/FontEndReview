// VueRouter是一个插件需要实现install方法
import Link from './my-link'
import View from './my-view'
let Vue;
class VueRouter {
  constructor(options) {
    this._options = options
    this.routeMap = {}

    Vue.util.defineReactive(this, 'current', '/')

    options.routes.forEach(route => {
      this.routeMap[route.path] = route
    })
    window.addEventListener('hashchange', this.onHashChange.bind(this))
    window.addEventListener('load', this.onHashChange.bind(this))
  }
  beforeEach(cb) {
    cb(1, 2, 3)
  }
  onHashChange() {
    this.current = window.location.hash.slice(1)
  }
}
VueRouter.install = function (_Vue) {
  // 传过来的Vue对象
  Vue = _Vue
  Vue.mixin({
    beforeCreate() {
      // 获取当前Vue中的options
      // console.log(this)
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router
      }
    },
  })
  Vue.component('router-link', Link)
  Vue.component('router-view', View)
}
export default VueRouter