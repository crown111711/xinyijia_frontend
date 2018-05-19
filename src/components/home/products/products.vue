<template>
  <div class="container">
    <Topbar></Topbar>
    <NavMenu></NavMenu>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col class="menu-box" :span="5">
        <p></p>
        <el-menu class="menu" :default-active="$route.path" router background-color="#fff" text-color="#267943" active-text-color="#000">
          <el-menu-item v-for="item in productclass" :index="'/product/'+item.businessName" :key="'/product/'+item.id" v-text="item.businessName">
          </el-menu-item>
        </el-menu>
      </el-col>
      <!-- 右边主要内容 -->
      <el-col :span="19">
        <!-- 商品列表渲染的地方 -->
        <transition name="el-zoom-in-center">
          <router-view :key="key"></router-view>
        </transition>
      </el-col>
    </el-row>
  </div>

</template>
<script>
  import adminApi from '../../../api/adminApi'
  import Topbar from '../topbar'
  import NavMenu from '../NavMenu'
  export default {
    data() {
      return {
        searchName: '',
        isactive: false,
        loading: false,
        productclass: []
      }
    },
    components: {
      Topbar,
      NavMenu
    },
    computed: {
      key() {
        return this.$route.params.class + new Date()
      }
    },
    methods: {
      // 获取商品类列表
      getAllBusiness() {
        adminApi.getAllBusiness({
          type: 'all'
        }).then(res => {
          let addtype = {
            businessName: '全部商品',
            id: 0
          }
          res.data.unshift(addtype)
          this.productclass = res.data
        })
      }
    },
    mounted() {
      this.getAllBusiness()
      this.$store.dispatch('updateIsHome', false)
      this.$store.dispatch('updateNavIndex', 'product');
    },
    created() {
      this.$store.dispatch('updateIsHome', false)
      this.$store.dispatch('updateNavIndex', 'product');
    }
  }

</script>
<style scoped>
  .el-input {
    margin: 20px 0;
    width: 60%;
  }

  .el-button {
    width: 25%;
    margin-right: 5px;
  }

  .menu {
    position: fixed;
    width: 200px;
    top: 150px;
    left: 50px;
    box-shadow: 0 0 6px #ccc;
  }

  .is-active {
    background: #669966 !important;
    /* border-bottom: 3px solid #66CC00 !important; */
    color: #fff !important;
    font-weight: bold !important;
  }

  @media screen and (max-width: 767px) {
    .menu {
      position: fixed;
      width: 25%;
      top: 100px;
      left: 5px;
      box-shadow: 0 0 6px #ccc;
    }
    .is-active {
      background: #669966 !important;
      /* border-bottom: 3px solid #66CC00 !important; */
      color: #fff !important;
      font-weight: bold !important;
    }
  }

</style>
