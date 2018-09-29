import Vue from 'vue'
import Vuex from 'vuex'
import test from './modules/test'

Vue.use(Vuex)

export function createStore() {
  return new Vuex.Store({
    modules: {
      test
    }
  })
}
