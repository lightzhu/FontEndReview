import React, { Component } from 'react';
import { pathToRegexp } from 'path-to-regexp';
import { Consumer } from './Context';
class Switch extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const children = this.props.children;
    return (<Consumer>
      {
        state => {
          const pathname = state.location.pathname;
          // console.log(children)
          for (let i = 0; i < children.length; i++) {
            let child = children[i];
            let path = child.props.path;
            let reg = pathToRegexp(path, [], { end: false })
            if (reg.test(pathname)) {
              console.log(child)
              return child;
            }
          }
          return null;
        }
      }
    </Consumer>)
  }
}
export default Switch;