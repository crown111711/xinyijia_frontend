<template>
  <div class="topbar">
    <div class="title">
      <div>
        <el-button size="medium" type="text" icon="el-icon-menu" @click="goToHome"></el-button>
        <span class="demo-affix">新亿嘉</span>
      </div>
    </div>
    <div class="topbar-info-dropdown">
      <!--<div class="info" v-if="showLogin">
        <span>{{userName}}</span>
        <span>|</span>
        <span>
        <i class="menu" v-on:click="logout" title="退出登录"></i>
      </span>
      </div>-->
      <div class="info" v-if="isLogin">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
         您好, {{ userName }}<i class="el-icon-arrow-down"></i>
      </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-if="isAdmin" command="companyManage">公司管理</el-dropdown-item>
            <el-dropdown-item v-if="isAdmin" command="productManage">产品管理</el-dropdown-item>
            <el-dropdown-item v-if="isAdmin" command="newsManage">新闻管理</el-dropdown-item>
            <el-dropdown-item command="userManage">用户管理</el-dropdown-item>
            <el-dropdown-item command="buyCar">我的购物车</el-dropdown-item>
            <el-dropdown-item command="logout">注销</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

      </div>
      <div class="info" v-if="notLogin">
        <Icon type="person"></Icon>
        <Button type="success" shape="circle" size="large" class="el-dropdown-link" @click="handleLogin">请登陆</Button>
      </div>


      <!--<div class="menu" v-show="dropdownMenu">
        <div @click="logout"><i class="fa fa-sign-out">&nbsp;</i>退出登录</div>
      </div>-->


    </div>
  </div>
</template>

<script>
  import router from '../../router'
  import API from '../../api/resources'
  import Axios from 'axios'

  export default {
    data() {
      return {
        userName: sessionStorage.getItem('userName'),
        dropdownMenu: true,
        isLogin: false,
        isAdmin: false
      }
    },
    computed: {
      showLogin() {
        Axios.get(API.isLogin, {
            params: {
              accessToken: sessionStorage.getItem('accessToken')
            }
          })
          .then(res => {
            if (res.data === true) {
              this.isLogin = true;
              // console.log(this.isLogin)
            }
          })
          .catch(err => {
            console.log(err)
          })

        // this.$store.getters.showState

      },
      showDropdown() {
        this.dropdownMenu = !this.dropdownMenu
      },
      notLogin() {
        return this.isLogin == true ? false : true
        // let res = this.$store.getters.showState
        // return res == true ? false : true;
      }
    },
    methods: {

      testAdmin() {
        console.log(sessionStorage.getItem('isAdmin'))
        this.isAdmin = sessionStorage.getItem('isAdmin') == "true" ? true : false
        console.log("admin:" + this.isAdmin)
      },
      userLogin() {


        Axios.get(API.isLogin, {
            params: {
              accessToken: sessionStorage.getItem('accessToken')
            }
          })
          .then(res => {
            if (res.data === true) {
              this.isLogin = true;
              console.log(this.isLogin)
            }
          })
          .catch(err => {
            console.log(err)
          })

        // this.$store.getters.showState
      },
      logout() {
        sessionStorage.removeItem('accessToken')
        sessionStorage.removeItem('userName')
        sessionStorage.removeItem('isAdmin')
        sessionStorage.removeItem('uid')
        this.$store.dispatch('showLogin')
        // this.userLogin()
        // this.testAdmin()
        let isHome = this.$store.getters.getIsHome
        if (isHome) {
          router.go({
            path: '/p/index'
          })
        } else {
          router.push({
            path: '/p/index'
          })
        }
      },
      goToHome() {
        router.push({
          path: '/p/index'
        })
      },
      goToUserManage() {
        router.push({
          path: '/userManager'
        })
      },
      goToBuyCar() {
        router.push({
          path: '/buyCar'
        })
      },
      handleCommand(command) {
        if (command === "userManage") {
          this.goToUserManage()
        } else if (command === "logout") {
          this.logout()
        } else if (command === "buyCar") {
          this.goToBuyCar()
        } else if (command === "productManage") {
          router.push({
            name: 'ProductManager',
            params: {
              defaultTab: "产品列表"
            }
          })
        } else if (command === "newsManage") {
          router.push({
            path: "/allNews"
          })
        } else if (command === "companyManage") {
          router.push({
            path: "/companymanager"
          })
        }
      },
      handleLogin() {
        router.push({
          path: '/login'
        })
      }

    },
    mounted() {
      this.testAdmin()
      this.userLogin()
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
  @main-blue: #6aa84f;
  @font-color: #fff;

  .topbar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    line-height: 50px;
    color: @font-color;
    background-color: @main-blue;
    font-size: 14px;

    .title {
      margin: 0 20px 0 45px;
      cursor: pointer;
      flex-grow: 0
    }



  }

  .topbar-info-dropdown {

    .topPage {
      width: 100px;
      margin: 0 20px 0 20px;
      cursor: right;

    }
    .info {
      width: 100px;
      margin: 0 20px 0 20px;
      cursor: pointer;
    }

    .menu {
      position: absolute;
      right: 0;
      width: 120px;
      height: 50px;
      color: @main-blue;
      font-size: 14px; // background-color: #fff;
      transition: all 1s;
      z-index: 99;
      border: 1px solid #ddd;

      div:hover {
        background-color: #f5f5f5;
        cursor: pointer;
      }
    }

    .el-dropdown-link {
      cursor: pointer;
      color: #000000;
    }
    .el-icon-arrow-down {
      font-size: 12px;
    }

  }

</style>
