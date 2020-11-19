// import React from 'react';
// import ReactDOM from 'react-dom';

import React from '../../myreact';
// import ReactDOM from '../../myreact/ReactDom';
import ReactDOM from '../../myreact/ReactDomFiber';
// import ReactDOM from '../../myreact/copy';  
import Component from '../../myreact/Component';
function FnComponent(props) {
  return (
    <div className='fn'>我是函数组件<span>组件的属性：{props.name}</span></div>
  )
}
class ClassComponent extends Component {
  render() {
    return (
      <h2>我是class组件</h2>
    )
  }
}
// console.log(ReactDOM)
let jsx = (<div className="pink">
  <p>我是一段话</p>
  {/* <span>fdfsffsf</span>
  <i>spanspsn</i> */}
  <FnComponent name="function" />
  <ClassComponent />
  {/*{
    [1, 2, 3, 4].map(item => {
      return (
        <div key={item}>{item}</div>
      )
    })
  } */}
</div>)

//redux demo展示
ReactDOM.render(jsx, document.getElementById('app'));