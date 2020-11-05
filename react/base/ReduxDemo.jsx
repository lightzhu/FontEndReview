// import { createStore } from 'redux'
// import thunk from 'redux-chunk'
import { createStore, applyMiddleware } from '../react-redux/MyRedux'
import React, { Component } from 'React'
// 1.reducer负责管理计算state
const defaultState = 0
const myReducer = function(state = defaultState, action) {
  switch (action.type) {
    case 'ADD':
      return state + action.payload
    case 'MINUS':
      return state - action.payload
    default:
      return state
  }
}
// 2.action生成器
const actionCreator = {
  add: () => {
    return {
      type: 'ADD',
      payload: 2,
    }
  },
  minus: () => {
    return {
      type: 'MINUS',
      payload: 1,
    }
  },
}
// 模拟一个中间件函数
function logger() {
  return (_dispatch) => (action) => {
    console.log(action.type + '执行了')
    return _dispatch(action)
  }
}
function thunk({ dispatch }) {
  // dispatch
  return (_dispatch) => (action) => {
    // console.log(dispatch)
    if (typeof action === 'function') {
      return action(_dispatch, dispatch)
    } else {
      return _dispatch(action)
    }
  }
}

const store = createStore(myReducer, applyMiddleware(logger, thunk))

class ReduxDemo extends Component {
  constructor(props) {
    super(props)
  }
  add = () => {
    store.dispatch(actionCreator.add())
  }
  min = () => {
    store.dispatch(actionCreator.minus())
  }
  asyncAdd() {
    store.dispatch((_dispatch) => {
      setTimeout(() => {
        console.log('异步的派发')
        _dispatch(actionCreator.add())
      }, 1000)
    })
  }
  //store.subscribe方法返回一个函数，调用这个函数就可以解除监听
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate()
    })
  }
  componentWillUnmount() {
    thi.unsubscribe()
  }
  render() {
    let data = store.getState()
    return (
      <div className='top-border'>
        ReduxDemo
        {data}
        <button onClick={this.add}>+</button>
        <button onClick={this.min}>-</button>
        <button onClick={this.asyncAdd}>async+</button>
      </div>
    )
  }
}
export default ReduxDemo
