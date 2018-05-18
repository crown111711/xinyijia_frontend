import Vue from 'vue'
import Router from 'vue-router'
import Axios from 'axios'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login/login'
import Register from '@/components/Login/register'
import HOME from '@/components/home/index'
import UserManager from '@/components/userManage/userInfo'
import BuyCar from '@/components/userManage/buyCar'

import AddProd from '@/components/admin/products/addprod.vue'
import ProductManager from '@/components/admin/products/productmanager'

import AllProds from '@/components/admin/products/allprods'
import AddBusiness from '@/components/admin/products/addBusiness'
import AddNews from '@/components/admin/news/addNews'
import AllNews from '@/components/admin/news/allnews'
import NewsTest from '@/components/home/news/newsTest'
import NewsContent from '@/components/home/news/newsContent'
import ProductList from '@/components/home/products/productList'
import Products from '@/components/home/products/products'
import ProductContent from '@/components/home/products/productContent'
import Test from '@/components/admin/products/test.vue'
import API from '../api/resources'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/userManager',
      name: 'UserManager',
      component: UserManager
    },
    {
      path: '/addProd',
      name: 'AddProd',
      component: AddProd
    },
     {
      path: '/productmanager',
      name: 'ProductManager',
      component: ProductManager
    },
    {
      path: '/allprods',
      name: 'AllProds',
      component: AllProds
    },
    {
      path: '/addBusiness',
      name: 'addBusiness',
      component: AddBusiness
    },
    {
      path: '/addNews',
      name: 'addNews',
      component: AddNews
    },
    {
      path: '/allNews',
      name: 'allNews',
      component: AllNews

    },
    {
      path: '/newsTest',
      name: 'newsTest',
      component: NewsTest
    }, {
      path: '/newsContent/:id',
      name: 'newsContent',
      component: NewsContent
    },
    {
      path: '/productList',
      name: 'productList',
      component: ProductList
    },
    {
      path: '/buyCar',
      name: 'buyCar',
      component: BuyCar

    }
    , {
      path: '/products',
      name: 'products',
      class: 'el-icon-goods',
      redirect: '/product/全部商品',
      component: Products,
      children: [{
        // 这里用的动态路由，需要一个冒号：
        path: '/product/:class',
        component: ProductList
      }]
    },{
     
        path: '/product/:class/:id',
        name: ProductContent,
        component: ProductContent
    
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    },
    {
      path: '/p/index',
      component:
        //resolve => require(['../components/home/index.vue'], resolve),
        HOME,
      //require('../components/home/index.vue'),
      // beforeEnter: (to, from, next) => {
      //   let pattern = /^(\/p)/g
      //   let accessToken = sessionStorage.getItem('accessToken')
      //   if (pattern.test(to.path)) {
      //     Axios.get(API.isLogin, {
      //         params: {
      //           accessToken: accessToken
      //         }
      //       })
      //       .then(res => {
      //         if (res.data === true) {
      //           next()
      //         } else {
      //           next({
      //             name: 'Login'
      //           })
      //         }
      //       })
      //       .catch(err => {
      //         console.log(err)
      //       })
      //   }
      // }
    },
    {
      path: '*',
      component: require('../components/NotFound.vue')
    }
  ]
})
