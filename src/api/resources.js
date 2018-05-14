import config from '../config'

var API_ROOT = config.API_ROOT
var USER_API_ROOT = config.USER_API_ROOT

export default {
  login: `${USER_API_ROOT}login`,
  register: `${USER_API_ROOT}register`,
  isLogin: `${USER_API_ROOT}isLogin`,
  getCaptcha: `${USER_API_ROOT}getCaptcha`,
}