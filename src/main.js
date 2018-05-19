// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './vuex/store'
import iView from 'iview';
import 'iview/dist/styles/iview.css';

// 引入mavon-editor
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.use(ElementUI);
Vue.use(iView);
Vue.use(mavonEditor)

Vue.config.productionTip = false

// 这个官方名字叫导航守卫，挺形象的
router.beforeEach((to, from, next) => {
  // 如果是去登录或注册，那就先把user移除
  if (to.path === '/login' || to.path === '/register') {
    sessionStorage.removeItem('accessToken')
    sessionStorage.removeItem('userName')
    sessionStorage.clear()
    // 在这里挂上，官方说的分发，登出的action
    // 应该这样就行了把,不过在main.js里面貌似不一定管用啊,这个可是js啊，不是vue?????
    // this.$store.dispatch('logout')
    // store.dispatch('logout')
  }

  let userName = sessionStorage.getItem('userName')
  let isAdmin =  sessionStorage.getItem('isAdmin')
  console.log(!isAdmin)
  let isLogin =  userName != null ?  true : false

  // 如果用户没有登录且前往需要用户登录才能访问的页面，那就让他先登录
  if (  (!isLogin && to.meta.requireUser) || (!isAdmin && to.meta.requireAdmin)) {
    next({
      path: '/login'
    })
  } else {
    next()
  }
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: ' <App/>'
})
