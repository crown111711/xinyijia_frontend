import Vue from 'vue'
import 'es6-promise/auto'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showLogin: false,
    captchaMsg: '发送验证码',
    captButtonAble: false
  },
  mutations: {
    SHOW_LOGIN(state) {
      state.showLogin = !state.showLogin
    },
    UPDATE_CAPTCHA_MSG(state, data) {
      state.captchaMsg = data
    },
    UPDATE_CAPTBUTTONABLE(state) {
      state.captButtonAble = !state.captButtonAble
    },
    UPDATE_CAPTBUTTONABLE_DATA(state, data) {
      state.captButtonAble = data
    }
  },
  actions: {
    showLogin({
      commit
    }) {
      commit('SHOW_LOGIN')
    },
    updateCaptchaMsg({
      commit
    }, data) {
      commit('UPDATE_CAPTCHA_MSG', data)
    },
    updateCaptButtonAbleOpposite({
      commit
    }) {
      commit('UPDATE_CAPTBUTTONABLE')
    },
    updateCaptButtonAble({
      commit
    }, data) {
      commit('UPDATE_CAPTBUTTONABLE_DATA', data)
    }
  },
  getters: {
    showState: function (state) {
      return state.showLogin
    },
    getCaptchaMsg: function (state) {
      return state.captchaMsg
    },
    getCaptButtonAble: function (state) {
      return state.captButtonAble
    }
  }
})
