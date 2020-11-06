let Vue;
class Store {
  constructor(options = {}) {
    // 响应化state
    this.state = new Vue({
      data: options.state
    })
    this._actions = options.actions || {}
    this._mutations = options.mutations || {}
    this.dispatch = this.dispatch.bind(this)
    this.commit = this.commit.bind(this)
  }
  dispatch(action, payload) {
    let actor = this._actions[action]
    if (!actor) {
      console.error(`unknown action type`);
      return
    }
    return actor(this, payload)
  }
  commit(type, payload) {
    (this._mutations[type])(this.state, payload)
  }
}

function install(_Vue) {
  Vue = _Vue
  Vue.mixin({
    beforeCreate() {
      console.log(this.$options.store)
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}
export default { Store, install }

