import config from '../config'

var API_ROOT = config.API_ROOT
var USER_API_ROOT = config.USER_API_ROOT
var PRODUCT_ROOT = config.PRODUCT_API_ROOT
var ATTACHMENT_ROOT = config.ATTACHMENT_API_ROOT

export default {
  login: `${USER_API_ROOT}login`,
  register: `${USER_API_ROOT}register`,
  isLogin: `${USER_API_ROOT}isLogin`,
  getCaptcha: `${USER_API_ROOT}getCaptcha`,
  getUserInfo: `${USER_API_ROOT}getUserInfo`,
  updateUserInfo: `${USER_API_ROOT}updateUserInfo`,
  getProducts:`${PRODUCT_ROOT}getProducts`,
  addProduct:`${PRODUCT_ROOT}addProducts`,
  uploadFile:`${ATTACHMENT_ROOT}uploadFile`,
  getAllBusiness:`${PRODUCT_ROOT}getAllBusiness`,
  updateBusiness:`${PRODUCT_ROOT}updateBusiness`,
  addBusiness:`${PRODUCT_ROOT}addBusiness`
}