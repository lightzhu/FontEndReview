import React, { Component } from 'react'
// import { connect } from 'react-redux';
import { bindActionCreators } from './MyRedux'
const ValueContext = React.createContext();

// function bind(creator, dispatch) {
//   return function (...args) {
//     console.log(args)
//     const action = creator(...args)
//     dispatch(action);
//   }
// }
// function bindActionCreators(creators, dispatch) {
//   let obj = {}
//   for (let key in creators) {
//     obj[key] = bind(creators[key], dispatch)
//   }
//   return obj
// }

export class Provider extends Component {
  render() {
    return (
      <ValueContext.Provider value={this.props.store}>
        {this.props.children}
      </ValueContext.Provider>
    );
  }
}

export function connect(mapStateToProps, mapDispatchToProps) {
  return WrapComponent => {
    return class extends Component {
      static contextType = ValueContext
      constructor(props) {
        super(props)
        this.state = {
          props: {}
        }
      }
      componentDidMount() {
        const { subscribe } = this.context
        this.update()
        subscribe(() => {
          this.update()
        })
      }
      update = () => {
        const { dispatch, getState } = this.context
        let stateProps = mapStateToProps(getState())
        let dispatchProps = undefined
        // mapDispatchToProps 可以是object或者function
        if (typeof mapDispatchToProps === 'object') {
          dispatchProps = bindActionCreators(mapDispatchToProps, dispatch)
        } else if (typeof mapDispatchToProps === 'function') {
          dispatchProps = mapDispatchToProps(dispatch)
        } else {
          dispatchProps = { dispatch }
        }
        this.setState({
          props: {
            ...dispatchProps,
            ...stateProps
          }
        })
      }
      render() {
        return (
          <WrapComponent {...this.state.props} />
          // <ValueContext.Consumer>

          // </ValueContext.Consumer>
        )
      }
    }
  }
}
