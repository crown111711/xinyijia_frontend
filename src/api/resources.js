import config from '../config'

var API_ROOT = config.API_ROOT
var USER_API_ROOT = config.USER_API_ROOT
var PRODUCT_ROOT = config.PRODUCT_API_ROOT
var ATTACHMENT_ROOT = config.ATTACHMENT_API_ROOT
var NEW_ROOT = config.NEW_API_ROOT

export default {
  login: `${USER_API_ROOT}login`,
  register: `${USER_API_ROOT}register`,
  isLogin: `${USER_API_ROOT}isLogin`,
  getCaptcha: `${USER_API_ROOT}getCaptcha`,
  getUserInfo: `${USER_API_ROOT}getUserInfo`,
  updateUserInfo: `${USER_API_ROOT}updateUserInfo`,
  getProducts: `${PRODUCT_ROOT}getProducts`,
  addProduct: `${PRODUCT_ROOT}addProducts`,
  uploadFile: `${ATTACHMENT_ROOT}uploadFile`,
  getAllBusiness: `${PRODUCT_ROOT}getAllBusiness`,
  updateBusiness: `${PRODUCT_ROOT}updateBusiness`,
  addBusiness: `${PRODUCT_ROOT}addBusiness`,
  searchProducts: `${PRODUCT_ROOT}searchProducts?searchParam=`,
  getAllProducts: `${PRODUCT_ROOT}getAllProducts`,
  deleteProduct: `${PRODUCT_ROOT}deleteProduct`,
  updateProduct: `${PRODUCT_ROOT}updateProduct`,
  deleteBusiness: `${PRODUCT_ROOT}deleteBusiness`,
  addNews: `${NEW_ROOT}addNews`,
  getNews: `${NEW_ROOT}getNews`,
  deleteNews: `${NEW_ROOT}deleteNews`,
  updateNews: `${NEW_ROOT}updateNews`,
  getNewsById: `${NEW_ROOT}getNews/`,
  getProductInBusiness: `${PRODUCT_ROOT}getProductsInBusiness`,
  recommendProduct: `${PRODUCT_ROOT}recommendProduct`,
  recharge: `${USER_API_ROOT}recharge`,
  getTradeInfos: `${USER_API_ROOT}getUserTrades`,
  buyProduct: `${USER_API_ROOT}buyProduct`,
  addBuyCar: `${USER_API_ROOT}addBuyCar`,
  getBuyCars: `${USER_API_ROOT}getBuyCars`,
  deleteBuyCar:  `${USER_API_ROOT}deleteBuyCar/`
}