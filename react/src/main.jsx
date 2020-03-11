import React, { Component } from 'react'
import { HashRouter, Route, Switch, Link, Redirect } from '../react-router-dom'
import Home from './components/Home.jsx'
import News from './components/News.jsx'
import User from './components/User.jsx'
import Center from './components/Center.jsx'
import './style/main.less'
class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div className='main'>
        <h2>React演示</h2>
        <div className='content'>
          <HashRouter>
            <div>
              <ul className='nav'>
                <li>
                  <Link to='/home'>Home</Link>
                </li>
                <li>
                  <Link to='/news'>news</Link>
                </li>
                <li>
                  <Link to='/user'>user</Link>
                </li>
                <li>
                  <Link to='/center/luck/889'>center</Link>
                </li>
              </ul>
              <Switch>
                {/* <Route exact={true} path='/' component={Home} /> */}
                <Route exact={true} path='/home' component={Home} />
                <Route exact path='/news' component={News} />
                <Route exact path='/user' component={User} />
                <Route exact path='/center/:name/:id' component={User} />
                <Redirect to='/home'></Redirect>
              </Switch>
            </div>
          </HashRouter>
        </div>
        <footer>主页底部</footer>
      </div>
    )
  }
}
export default Main
