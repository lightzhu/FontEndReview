import React from 'react'
import ReactDom from 'react-dom'
import List from './page/List.jsx'
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
    return (
      <div>
        <h2>我是大标题</h2>
        <img src={require('./img/二维码.png').default} alt="" />
        <List></List>
      </div>
    )
  }
}
ReactDom.render(<App />, document.querySelector('#app'))
