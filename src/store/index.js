import Vue from 'vue'
import Vuex from 'vuex'
import cart from './modules/cart'
import createPersistedState from "vuex-persistedstate"
Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    token: '',
    phone: '',
    isLogin: false
  },
  mutations: {
    updataLoginState(state, payload) {
      state.isLogin = payload;
    },
    updataPhone(state, payload) {
      state.phone = payload;
    },
    updataToken(state, payload) {
      state.token = payload;
    }
  },
  modules: {
    cart,
  },
  plugins: [createPersistedState()]
})