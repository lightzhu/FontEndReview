import React from 'react'
import ReactDom from 'react-dom'
// const _ = require('lodash')
import { add } from './util'
console.log(_)
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    console.log(_.difference([3, 2, 1], [4, 2]))
  }
  componentDidMount() {
    add()
  }
  render() {
    return <h2>我是大标题</h2>
  }
}
ReactDom.render(<App />, document.querySelector('#app'))
