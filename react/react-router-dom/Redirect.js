import React, { Component } from 'react';
import { Consumer } from './Context';
class Redirect extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (<Consumer>
      {state => {
        state.history.push(this.props.to);
        return null;
      }}
    </Consumer>)
  }
}
export default Redirect;