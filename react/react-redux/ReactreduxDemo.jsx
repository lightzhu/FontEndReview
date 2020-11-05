import React, { Component } from 'react'
// import { Provider } from 'react-redux'

import { Provider } from './MyReactredux'

import ChildDemo from './ChildDemo.jsx'
import store from './store'
class ReactreduxDemo extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  minus = () => {
    store.dispatch({ type: 'MINUS', payload: 1 })
  }
  render() {
    let number = store.getState()
    return (
      <Provider store={store}>
        <div className='top-border'>react-redux</div>
        <div>
          father {number}
          <button onClick={this.minus}>父组件减</button>
        </div>
        <ChildDemo />
      </Provider>
    )
  }
}

export default ReactreduxDemo
