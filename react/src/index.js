import React from 'react';
import ReactDOM from 'react-dom';
import Main from './main.jsx';
import Domdiff from './Domdiff.jsx';
import FunctionComponent from '../base/FunctionComponent.jsx';
import ReduxDemo from '../base/ReduxDemo.jsx';
import ReactreduxDemo from '../react-redux/ReactreduxDemo.jsx';
//路由相关展示
// ReactDOM.render(<Main />, document.querySelector('#root'));

//dom-diff 相关展示
ReactDOM.render(<Domdiff />, document.querySelector('#dom_diff'));
//函数组件 相关展示
ReactDOM.render(<FunctionComponent />, document.querySelector('#fun_component'));

//redux demo展示
ReactDOM.render(<ReduxDemo />, document.querySelector('#redux_demo'));

//redux demo展示
ReactDOM.render(<ReactreduxDemo />, document.querySelector('#ReactreduxDemo')); 