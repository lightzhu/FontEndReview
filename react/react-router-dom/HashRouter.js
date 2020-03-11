import React, { Component } from 'react';
import { Provider } from './Context';
class HashRouter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      location: {
        pathname: window.location.hash.slice(1) || '/'
      }
    }
  }
  componentDidMount() {
    window.location.hash = window.location.hash || '/';
    // 更新loaction参数
    // 监听路由hash变化
    window.addEventListener('hashchange', () => {
      this.setState({ location: { ...this.state.location, pathname: window.location.hash.slice(1) || '/' } });
    });
  }
  render() {
    const value = {
      location: this.state.location,
      history: {
        push(to) {
          window.location.hash = to
        }
      }
    }
    return (
      <Provider value={value}>
        {this.props.children}
      </Provider>
    )
  }
}
export default HashRouter;