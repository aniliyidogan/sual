import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {}
  },
  actions: {
    setUser ({ commit }, user) {
      commit('SET_USER', user)
    }
  },
  mutations: {
    SET_USER (state, user) {
      state.user = user
    }
  },
  plugins: [createPersistedState()]
})
