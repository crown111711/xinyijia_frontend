import Vue from 'vue'
import Router from 'vue-router'
import Axios from 'axios'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login/login'
import Register from '@/components/Login/register'
import HOME from '@/components/home/index'
import UserManager from '@/components/userManage/userInfo'

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
      path:'/userManager',
      name:'UserManager',
      component:UserManager
    },
    {
      path: '/p/index',
      component:
       //resolve => require(['../components/home/index.vue'], resolve),
       HOME,
      //require('../components/home/index.vue'),
      beforeEnter: (to, from, next) => {
        let pattern = /^(\/p)/g
        let accessToken = sessionStorage.getItem('accessToken')
        if (pattern.test(to.path)) {
          Axios.get(API.isLogin, {
            params:
            {
              accessToken: accessToken
            }
            })
            .then(res => {
              if (res.data === true) {
                next()
              } else {
                next({
                  name: 'Login'
                })
              }
            })
            .catch(err => {
              console.log(err)
            })
        }
      }
    },
    {
      path: '*',
      component: require('../components/NotFound.vue')
    }
  ]
})
