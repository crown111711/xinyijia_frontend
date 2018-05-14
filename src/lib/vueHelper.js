// doLogin

import api from '../api/index'
import store from '../vuex/store'
import router from '../router'

// 显示提示框
export const showMsg = (that, close, msg, type) => {
  that.$message({
    showClose: close,
    message: msg,
    type: type
  })
}

export const doLogin = (that, data) => {
  api.login(data)
    .then(res => {
      if (res.data.status === true) {
        sessionStorage.setItem('accessToken', res.data.accessToken)
        sessionStorage.setItem('userName', res.data.userName)
        sessionStorage.setItem('uid', res.data.uid)
        store.dispatch('showLogin')
        showMsg(that, true, '登录成功', 'success')
        router.push({
          path: '/p/index',
          params: {
            userName: res.data.userName
          }
        })
      } else {
        showMsg(that, true, '登录失败，账号或密码错误', 'error')
      }
    })
    .catch(err => {
      console.log(err)
    })
}

// doRegister
export const doRegister = (that, data) => {
  store.dispatch('updateCaptchaMsg', '发送验证码');
  api.register(data)
    .then(res => {
      if (res.data.code === 0) {
        showMsg(that, true, '注册成功', 'success')
        router.push({
          name: 'Login'
        })
      } else if (res.data.code === 88) {
        showMsg(that, true, '验证码错误', 'error')
      } else if (res.data.code === 99) {
        showMsg(that, true, '用户名已被注册', 'error')
      }
    })
    .catch(err => {
      console.log(err)
    })
}

// sendCaptcha
export const sendCaptcha = (that, data) => {
  store.dispatch('updateCaptchaMsg', '正在发送')
  store.dispatch('updateCaptButtonAble',true)

  let timeFlag = 60
  let flag = setInterval(function () {
    if (timeFlag === 0) {
      clearInterval(flag);
      store.dispatch('updateCaptButtonAble',false)
      store.dispatch('updateCaptchaMsg', '再次发送')
    } else {
      // timeFlag = timeFlag - 1 ;
      store.dispatch('updateCaptchaMsg', timeFlag--)
    }
  }, 1000)

  api.getCaptcha(data)
    .then(res => {
      let code = res.data.code
      // let captchaMsg = res.data.captchaMag
      if (code === 0) {
        clearInterval(flag)
        store.dispatch('updateCaptButtonAble', true)
        store.dispatch('updateCaptchaMsg', '发送成功')
      } else if (code === 88) {
        store.dispatch('updateCaptchaMsg', '已经发送')
      } else if (code === 99) {
        showMsg(that, true, '验证码发送失败', 'error')
      }
    })
    .catch(err => {
      console.log(err)
    })
}
