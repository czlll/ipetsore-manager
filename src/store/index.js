import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import getters from './getters'
import mutations from './mutations'
import user from './modules/user'
import permission from './modules/permission'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    // app,
    user,
    permission
  },
  getters,
  state,
  mutations
})

export default store;
// export default new Vuex.Store({
//     state,
//     getters,
//     user,
//     permission
// })
