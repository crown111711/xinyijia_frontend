<template>
  <el-menu :default-active='defIndex' class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#cccccc"
    text-color="#000000" active-text-color="#4a86e8">
    <el-menu-item index="home">首页</el-menu-item>
    <el-menu-item index="about">关于新亿嘉</el-menu-item>
    <!--<el-submenu index="2">
    <template slot="title">关于新亿嘉</template>
    <el-menu-item index="2-1">选项1</el-menu-item>
    <el-menu-item index="2-2">选项2</el-menu-item>
    <el-menu-item index="2-3">选项3</el-menu-item>
    <el-submenu index="2-4">
      <template slot="title">选项4</template>
      <el-menu-item index="2-4-1">选项1</el-menu-item>
      <el-menu-item index="2-4-2">选项2</el-menu-item>
      <el-menu-item index="2-4-3">选项3</el-menu-item>
    </el-submenu>
  </el-submenu>-->
    <el-menu-item index="product">业务与产品</el-menu-item>
    <!--<el-menu-item index="honor">资质荣誉</el-menu-item>-->
    <el-menu-item index="callus">联系我们</el-menu-item>
    <el-menu-item index="download">服务与下载</el-menu-item>
    <el-menu-item index="recruit">招贤纳士</el-menu-item>
    <!--<el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>-->
  </el-menu>
</template>

<script>
  import router from '../../router'
  export default {
    data() {
      return {
        defIndex: 'home'
      };
    },
    methods: {
      handleSelect(index, indexPath) {
        this.$store.dispatch('updateNavIndex', index);
        switch (index) {
          case 'home':
            router.push({
              path: "/p/index"
            })
            break;
          case 'product':
            router.push({
              path: '/products'
            });
            break;
          case 'download':
            router.push({
              path: '/downFile'
            });
            break;
          case 'callus':
            router.push({
              path: '/callus'
            });
            break;
          case 'about':
            router.push({
              path: '/aboutCompany'
            });
            break;
          case 'recruit':
            router.push({
              path: '/recruitCompany'
            });
            break;
        }
        console.log(index, indexPath)
      }
    },
    created() {
      this.defIndex = this.$store.getters.getNavIndex
    }
  }

</script>
