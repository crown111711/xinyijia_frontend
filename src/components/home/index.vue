<template>
  <div class="wrapper">
    <Topbar></Topbar>
    <NavMenu></NavMenu>
    <div class="bd">
      <div class="left-bd">
        <horse-lantern></horse-lantern>
      </div>
      <div class="right-bd">
        <news-tab></news-tab>
      </div>
    </div>
    <el-tooltip placement="top">
      <div slot="content">点击查看更多</div>
      <el-button  @click="handleSelect" >商品信息</el-button>
    </el-tooltip>
    <div class="product">
      <products></products>
    </div>

  </div>
</template>


<script>
  import Topbar from './topbar'
  import NavMenu from './NavMenu'
  import HorseLantern from './horseLantern'
  import NewsTab from './newsTab'
  import Products from './products'
  export default {
    components: {
      Topbar,
      NavMenu,
      HorseLantern,
      NewsTab,
      Products
    },
    data() {
      return {}
    },
    computed: {

    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }

</script>

<style scoped>
  .wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }

  .bd {
    display: flex;
    flex-direction: row;
    justify-content: center;
    /*padding-bottom: 100%;*/
    height: 100%;
  }

  .left-bd {
    flex-basis: 600px;
    flex-grow: 0;
  }

  .right-bd {
    flex-basis: 100px;
    flex-grow: 1;
  }

  .main {
    height: 50%;
  }

  .product {
    height: 300px;
  }

</style>
