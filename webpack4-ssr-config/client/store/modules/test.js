const state = {
  count: 0,
  testResult: null
}

const getters = {
  getCount: state => state.count,
  getTestResult: state => state.testResult
}

const mutations = {
  INCREMENT: (state) => {
    state.count++
  },
  DECREMENT: (state) => {
    state.count--
  },
  INITCOUNT: (state, COUNT) => {
    state.count = COUNT
  },
  TESTRESULT: (state, data) => {
    state.testResult = data
  }
}

const actions = {
  increment({ state, commit }) {
    commit('INCREMENT')
  },
  decrement({ state, commit }) {
    commit('DECREMENT')
  },
  loading({ commit, rootState: { $http } }) {
    // return new Promise(resolve => {
    //   setTimeout(() => {
    //     resolve()
    //   }, 1000)
    // }).then(() => {
    //   commit('INITCOUNT', 67)
    //   commit('INITCOUNT', 67)
    // })
    return $http.get('/v3/assistant/coordinate/convert?key=ff0bcf778c5eeb93bd8b068b6e3f7781&locations=116.481499,39.990475|116.481499,39.990375')
      .then(res => {
        commit('INITCOUNT', 269)
        commit('TESTRESULT', res)
      })
  },
  resetCount({ commit }) {
    commit('INITCOUNT', 67)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
