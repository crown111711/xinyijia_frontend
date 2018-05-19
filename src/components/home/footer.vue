<template>
  <el-row class="footer">
    <el-col :span="8">
      <img class="logo" :src="logoUrl" alt="">
    </el-col>
    <el-col :span="16">
      <p class="copy">Copyright © 2018-2028.新亿嘉网络科技有限公司.All Rights Reserved.</p>
      <p class="beian">ICP备案号：</p>
    </el-col>
  </el-row>

</template>
<script>
  export default {
    data() {
      return {
        logoUrl: ''

      }
    },
    computed: {
      siteoption() {
        return this.$store.state.siteoption
      }
    }
  }

</script>

<style lang="less" scoped>
  @import '../../assets/css/init.css';
  @import '../../assets/css/index.less';
  .footer {
    width: 100%;
    box-shadow: 0 -1px 1px @color;
    background: #fff;
    z-index: 10;
    .logo {
      width: 240px;
      height: 60px;
      margin: 10px 0 0 0;
      @media screen and (max-width: 768px) {
        width: 100%;
        height: 45px;
        margin: 15px 0 0 0;
      }
    }
  }

</style>
