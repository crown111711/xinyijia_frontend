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
    return Axios.get(API.searchProducts + params)
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
    return Axios.get(API.getNews, {
      params: {
        id: param
      }
    })
  }

}
