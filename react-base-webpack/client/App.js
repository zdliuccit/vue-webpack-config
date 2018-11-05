import React from 'react'
import PrivateRoute from './components/privateRoute'
import { Route, Switch } from 'react-router-dom'
import Login from './view/login'
import Index from './view/index'

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route path='/login' component={Login}/>
        <PrivateRoute path='/' component={Index}/>
      </Switch>
    )
  }
}

export default App
