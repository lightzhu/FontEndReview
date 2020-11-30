import React, { Component } from 'react'
// import { connect } from 'react-redux'
import { connect } from './MyReactredux'
const actionCreator = {
  add: () => {
    return {
      type: 'ADD',
      payload: 2
    }
  },
  minus: () => {
    return {
      type: 'MINUS',
      payload: 1
    }
  }
}
class ChildDemo extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  // add = () => {
  //   this.props.dispatch(actionCreator.add())
  // }
  componentDidMount() {
    window.addEventListener('popstate', () => {
      console.log(window.history)
    })
  }
  add = () => {
    this.props.add()
    history.pushState(null, null, 'www.baidu.com')
    setTimeout(() => {
      history.back()
    }, 1000)
  }
  render() {
    console.log(this.props)
    return (
      <div>
        <div>
          {' '}
          child <span>{this.props.number} </span>
          <button onClick={this.add}>子组件加</button>
        </div>
      </div>
    )
  }
}

export default connect(
  // mapDispatchToProps
  state => {
    return {
      number: state
    }
  },
  // mapDispatchToProps
  // 如果不指定mapDispatchToProps，默认props会被注入dispatch本身
  // 可以是一个obj
  {
    add: () => actionCreator.add(111)
  }
  // 可以是一个方法
  // (dispatch, ownProps) => {
  //   return {
  //     add: () => {
  //       dispatch(actionCreator.add())
  //     },
  //   }
  // }
)(ChildDemo)
