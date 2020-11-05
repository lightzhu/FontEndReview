import { createStore } from 'redux'
const defaultState = 0
const myReducer = function (state = defaultState, action) {
  switch (action.type) {
    case 'ADD':
      return state + action.payload
    case 'MINUS':
      return state - action.payload
    default:
      return state
  }
}
export default createStore(myReducer)