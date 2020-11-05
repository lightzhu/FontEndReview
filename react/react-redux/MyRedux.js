// 函数聚合
function compose(...funcs) {
  // debugger
  if (funcs.length === 0) {
    return arg => arg
  }
  if (funcs.length === 1) {
    return funcs[0]
  }
  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
class MyRedux {
  constructor(reducer) {
    this.reducer = reducer
    this.fns = []
    this.state = undefined
    // 初始state
    this.dispatch({ type: '@@INIT' })
  }

  getState() {
    return this.state
  }
  dispatch(action) {
    this.state = this.reducer(this.state, action)
    this.fns.map((item) => item())
  }
  subscribe(listener) {
    this.fns.push(listener)
    return listener
  }
}

export function createStore(reducer, enhancer) {
  let store = new MyRedux(reducer)
  // console.log(enhancer)
  // debugger
  if (enhancer) {
    return enhancer(store)
  }
  return store
}
export function applyMiddleware(...middlewares) {
  // debugger
  return store => {
    let dispatch = store.dispatch
    console.log(dispatch)
    let middlewaresChain = middlewares.map(middleware => middleware({ dispatch }))
    let newDispatch = compose(...middlewaresChain)(dispatch.bind(store))
    store.dispatch = newDispatch
    return store
  }
}
function bind(creator, dispatch) {
  return function (...args) {
    console.log(args)
    const action = creator(...args)
    dispatch(action);
  }
}
export function bindActionCreators(creators, dispatch) {
  let obj = {}
  for (let key in creators) {
    obj[key] = bind(creators[key], dispatch)
  }
  return obj
}
