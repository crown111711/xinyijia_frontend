<template>
  <div class="topbar">
    <div class="title">新亿嘉</div>
    <div class="topbar-info-dropdown">


      <!--<div class="info" v-if="showLogin">
        <span>{{userName}}</span>
        <span>|</span>
        <span>
        <i class="menu" v-on:click="logout" title="退出登录"></i>
      </span>
      </div>-->

      <div class="info" v-if="showLogin">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
          {{ userName }}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="userManage">用户管理</el-dropdown-item>
            <el-dropdown-item command="buyCar">我的购物车</el-dropdown-item>
            <el-dropdown-item command="logout">注销</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

      </div>


      <!--<div class="menu" v-show="dropdownMenu">
        <div @click="logout"><i class="fa fa-sign-out">&nbsp;</i>退出登录</div>
      </div>-->



    </div>
  </div>
</template>

<script>
  import router from '../../router'

  export default {
    data() {
      return {
        userName: sessionStorage.getItem('userName'),
        dropdownMenu: true
      }
    },
    computed: {
      showLogin() {
        let res = this.$store.dispatch('showLogin')
        return res
      },
      showDropdown() {
        this.dropdownMenu = !this.dropdownMenu
      }
    },
    methods: {
      logout() {
        sessionStorage.removeItem('accessToken')
        sessionStorage.removeItem('userName')
        sessionStorage.clear()
        router.push({
          path: '/'
        })
      },
      goToUserManage() {
        router.push({
          path: '/userManager'
        })
      },
      goToBuyCar() {
        router.push({
          path: '/'
        })
      },
      handleCommand(command) {
        if (command === "userManage") {
          this.goToUserManage()
        } else if (command === "logout") {
          this.logout()
        } else if (command === "buyCar") {
          this.goToBuyCar()
        }
      }

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
    }
  }

  .topbar-info-dropdown {

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
