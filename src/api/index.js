import Axios from 'axios'
import API from './resources'

export default {
  login(data) {
    return Axios.post(API.login, data)
  },
  register(data) {
    return Axios.post(API.register, data)
  },
  getCaptcha(data) {
    return Axios.post(API.getCaptcha, data)
  },
  getUserInfo(data) {
    return Axios.get(API.getUserInfo + "?accessToken=" + data)
  },
  updateUserInfo(data) {
    return Axios.post(API.updateUserInfo, data)
  },
  updateUserImage(data) {
    return Axios.post(API.updateUserImage, data)
  },
  recharge(data) {
    return Axios.post(API.recharge, data)
  },
  addBuyCar(params) {
    return Axios.post(API.addBuyCar, params)
  },
  getBuyCars(param) {
    return Axios.get(API.getBuyCars, {
      params: {
        accessToken: param
      }
    })
  },
  buyProduct(param) {
    return Axios({
      url: API.buyProduct,
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      data: param
    })
    // return Axios.post(API.buyProduct,param)
  },
  getTradeInfos(param) {
    return Axios.get(API.getTradeInfos, {
      params: {
        accessToken: param
      }
    })
  },
  deleteBuyCar(param) {
    return Axios.get(API.deleteBuyCar + param)
  }
}
