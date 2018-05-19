import Axios from 'axios'
import API from './resources'

export default {
  getProducts(params) {
    return Axios.get(API.getProducts, {
      params: params
    })
  },
  addProduct(params) {
    return Axios.post(API.addProduct, params)
  },
  unloadFile(params) {
    return Axios({
      url: API.uploadFile,
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: params
    })
  },
  getAllBusiness() {
    return Axios.get(API.getAllBusiness)
  },
  updateBusiness(params) {
    return Axios.post(API.updateBusiness, params)
  },
  addBusiness(params) {
    return Axios.post(API.addBusiness, params)
  },
  searchProducts(params) {
    return Axios.get(API.searchProducts+params.searchParam +"&searchBusiness="+ params.searchBusiness)
  },
  getAllProducts(params) {
    return Axios.get(API.getAllProducts)
  },
  deleteProduct(param) {
    return Axios.get(API.deleteProduct, {
      params: {
        id: param
      }
    })
  },
  updateProduct(params) {
    return Axios.post(API.updateProduct, params)
  },
  deleteBusiness(param) {
    return Axios.get(API.deleteBusiness, {
      params: {
        id: param
      }
    })
  },
  addNews(params) {
    return Axios.post(API.addNews, params)
  },
  getNews(param) {
    return Axios.get(API.getNews, {
      params: {
        category: param
      }
    })
  },
  deleteNews(param) {
    return Axios.get(API.deleteNews, {
      params: {
        id: param
      }
    })
  },
  updateNews(params) {
    return Axios.post(API.updateNews, params)
  },
  getNewsById(params) {
    return Axios.get(API.getNewsById + params)
  }, 
  getProductsInBusiness(param) {
    return Axios.get(API.getProductInBusiness, {
      params: {
        businessName: param.businessName,
        businessId: param.businessId,
        productId: param.productId
      }
    })
  },
  recommendProduct(param) {
    return Axios.get(API.recommendProduct, {
      params: {
        accessToken:param
      }
    })
  },
  getDownFile(){
    return Axios.get(API.getDownFile)
  },
  getCompany(){
    return Axios.get(API.getCompany)
  },
  updateBasicInfo(params){
    return Axios.post(API.updateBasicInfo,params)
  },
  getAbout(param){
    return Axios.get(API.getAbout, {
      params: {
        category:param
      }
    })
  }

}
