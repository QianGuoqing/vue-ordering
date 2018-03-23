import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'

const store = new Vuex.Store({
  state: {
    menuItems: {},
    currentUser: null,
    isLogin: false
  },
  getters,
  mutations,
  actions
})

export default store
