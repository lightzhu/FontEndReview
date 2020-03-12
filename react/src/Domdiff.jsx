import React, { Component } from 'react'
import createElement from '../dom-diff/element'
import diff from '../dom-diff/diff'
import patch from '../dom-diff/patch'
class Domdiff extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.newElement1 = createElement('ul', { class: 'list' }, [
      createElement('li', { class: 'item' }, ['1text']),
      createElement('li', { class: 'item' }, ['2text']),
      createElement('li', { class: 'item' }, ['3text'])
    ])
    this.newElement2 = createElement('ul', { class: 'list-new' }, [
      createElement('li', { class: 'item' }, ['text node']),
      createElement('li', { class: 'item' }, ['2tessxt']),
      createElement('li', { class: 'item' }, [
        '3new',
        createElement('a', { href: 'www.baidu.com' }, ['百度一下'])
      ])
    ])
    console.log(this.newElement1, this.newElement2)
    this.patches = diff(this.newElement1, this.newElement2)
    this.html1 = this.newElement1.render()
    this.html2 = this.newElement2.render()
    document.querySelector('#dom_diff').appendChild(this.html1)
  }
  componentDidMount() {
    setTimeout(() => {
      console.log(this.patches)
      patch(this.html1, this.patches)
    }, 2000)
  }
  render() {
    return <div>Domdiff</div>
  }
}
export default Domdiff
