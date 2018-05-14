import Axios from 'axios'
import API from './resources'

export default {
  login (data) {
    return Axios.post(API.login, data)
  },
  register (data) {
    return Axios.post(API.register, data)
  },
  getCaptcha (data) {
    return Axios.post(API.getCaptcha, data)
  }
}