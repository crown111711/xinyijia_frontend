<template>
  <div>
    <Topbar></Topbar>
    <NavMenu></NavMenu>
    <el-card class="box-card" center align=left>
      <div slot="header" class="clearfix">
        <span>文件下载</span>
      </div>
      <div v-for="(item,index) in files" :key="item.fileName" class="text item">
        <a :href="item.fileUrl"> {{index+1}}. &nbsp;  {{item.oldName}} [ {{item.fileDesc}}] </a>
      </div>
    </el-card>
  </div>
</template>

<script>
  import adminApi from '../../api/adminApi'
  import Topbar from './topbar'
  import NavMenu from './NavMenu'
  export default {
    data() {
      return {
        files: []
      }
    },
    components: {
      Topbar,
      NavMenu
    },
    created() {
      adminApi.getDownFile().then(res => {
        if (res.data.code === 0) {
          this.files = res.data.data
        }
      })

       this.$store.dispatch('updateIsHome', false)
      this.$store.dispatch('updateNavIndex', 'download');
    }
  }

</script>

<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
    margin-left: 30px;
  }

  .clearfix {
    position: relative;
    font-size: 24px;
    margin-top: 0px;
    height: 50px;

  }

  /*.clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }*/

  .box-card {
    width: 100%;
  }

</style>
