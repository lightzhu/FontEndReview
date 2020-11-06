import Vue from 'vue'
// import Vuex from 'vuex'
import Vuex from '@/vuex/vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    editPayInfo: {},
    count: 0
  },
  getters: {
    editChannelInfo: state => {
      return state.editChannelInfo
    },
  },
  mutations: {
    SET_CHANNELINFO(state, info) {
      state.editChannelInfo = info
    },
    ADD(state, data) {
      state.count += data
    }
  },
  actions: {
    setEditChannelInfo({ commit }, info) {
      commit('SET_CHANNELINFO', info)
    },
    add({ commit }, data) {
      commit("ADD", data)
    }
  }
})
