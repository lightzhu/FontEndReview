import React, { Component } from 'react';
import { pathToRegexp } from 'path-to-regexp';
import { Consumer } from './Context';
class Route extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (<Consumer>
      {state => {
        let keys = [];
        const { path, component: Component, exact = false } = this.props;
        let reg = pathToRegexp(path, keys, { end: exact });
        keys = keys.map(item => item.name);
        const pathname = state.location.pathname;
        let result = pathname.match(reg);
        console.log(keys);
        if (result) {
          let [url, ...values] = result;
          let props = {
            location: state.location,
            history: state.history,
            match: {
              url,
              path,
              params: keys.reduce((memo, key, idx) => {
                memo[key] = values[idx];
                return memo;
              }, {})
            }
          }
          return <Component {...props}></Component>
        }
        return null
      }}
    </Consumer>)
  }
}
export default Route;