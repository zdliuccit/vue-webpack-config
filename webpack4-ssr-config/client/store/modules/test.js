const state = {
  count: 0
}

const getters = {
  getCount: state => state.count
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
  }
}

const actions = {
  increment({ state, commit }) {
    commit('INCREMENT')
  },
  decrement({ state, commit }) {
    commit('DECREMENT')
  },
  loading({ commit }) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, 1000)
    }).then(() => {
      commit('INITCOUNT', 67)
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
