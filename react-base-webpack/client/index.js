/**
 * Created by zdliuccit on 18/11/1.
 */
import '@babel/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { LocaleProvider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'

ReactDOM.render(
  <Router>
    <LocaleProvider locale={zh_CN}>
      <App/>
    </LocaleProvider>
  </Router>,
  document.getElementById('app')
)

if (module.hot) {
  module.hot.accept()
}