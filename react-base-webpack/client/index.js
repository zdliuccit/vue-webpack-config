/**
 * Created by zdliuccit on 18/11/1.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import { AppContainer } from 'react-hot-loader'

function init() {
  ReactDOM.render(
    <App/>,
    document.getElementById('app')
  )
}

init()

// 热更新
if (module.hot) {
  module.hot.accept(() => {
    init()
  })
}