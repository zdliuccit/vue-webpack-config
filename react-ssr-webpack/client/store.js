/**
 * Created by liuzhengdong on 16/9/21.
 */
import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
// import loginReducer from './view/login/LoginReducer'

const logger = createLogger()

let Store = createStore(
  combineReducers({
    // loginReducer,
  }),
  applyMiddleware(logger)
)

export default Store
