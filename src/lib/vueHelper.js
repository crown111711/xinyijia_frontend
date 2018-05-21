// doLogin

import api from '../api/index'
import store from '../vuex/store'
import router from '../router'
import Axios from 'axios'
import API from '../api/resources'

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
        sessionStorage.setItem('isAdmin', res.data.admin)
        store.dispatch('showLogin')
        store.dispatch('updateAdminStatus', res.data.admin)
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


//加入购物车
export const addBuyCar = (that, params) => {


  let isLogin = false;

  Axios.get(API.isLogin + "?accessToken=" + sessionStorage.getItem('accessToken')

    )
    .then(res => {
      if (res.data === true) {
        isLogin = true;
        return api.addBuyCar(params).then(res => {
          if (res.data.code === 0) {
            showMsg(that, true, "加入购物车成功", 'success')
            router.push({
              path: '/buyCar'
            })
          } else(
            showMsg(that, true, "系统繁忙", 'error')
          )

        }).catch(err => {
          console.log(err)
        })
      } else {
        showMsg(that, true, "您尚未登陆，请先登录", 'error')
        router.push({
          path: '/login'
        })
      }
    })
    .catch(err => {
      console.log(err)
    })

  // if (isLogin) {
  //   return api.addBuyCar(params).then(res => {
  //     if (res.data.code === 0) {
  //       showMsg(that, true, "加入购物车成功", 'success')
  //       router.push({
  //         path: '/buyCar'
  //       })
  //     } else(
  //       showMsg(that, true, "系统繁忙", 'error')
  //     )

  //   }).catch(err => {
  //     console.log(err)
  //   })
  // } else {
  //   showMsg(that, true, "您尚未登陆，请先登录", 'error')
  //    router.push({
  //         path: '/login'
  //       })
  // }

}



//获取用户信息
export const getUserInfo = (that) => {
  let accessToken = sessionStorage.getItem('accessToken');
  return api.getUserInfo(accessToken).then(res => {
    if (res.data.code === 0) {
      return res.data;
    } else if (res.data.code === 1) {
      showMsg(that, true, "系统繁忙", 'error')
    } else if (res.data.code === 44) {
      showMsg(that, true, "用户尚未登陆", 'error')
      router.push({
        path: '/login'
      })
    }
  }).catch(err => {
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


//updateBasicUserIfno
export const updateBasicUserInfo = (that, data) => {
  api.updateUserInfo(data)
    .then(res => {
      if (res.data.code === 0) {
        showMsg(that, true, '更新基本信息成功', 'success')
      } else if (res.data.code === 1) {
        showMsg(that, true, '系统繁忙', 'error')
      } else if (res.data.code === 44) {
        showMsg(that, true, '您尚未登陆', 'error')
        router.push({
          path: '/login'
        })
      }
    })
    .catch(err => {
      console.log(err)
    })
}

// sendCaptcha
export const sendCaptcha = (that, data) => {
  store.dispatch('updateCaptchaMsg', '正在发送')
  store.dispatch('updateCaptButtonAble', true)

  let timeFlag = 60
  let flag = setInterval(function () {
    if (timeFlag === 0) {
      clearInterval(flag);
      store.dispatch('updateCaptButtonAble', false)
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
