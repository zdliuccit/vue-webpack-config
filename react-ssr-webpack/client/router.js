/**
 * Created by liuzhengdong on 16/9/21.
 */
import React from 'react'
import { Router, Route, Redirect } from 'react-router'
import { Provider } from 'react-redux'
import Store from './store'
import App from './app'

class router extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Provider store={Store}>
        <Router>
          <Route component={App}>
          </Route>
          <Redirect from="*" to="/"/>
        </Router>
      </Provider>
    )
  }
}

export default router
