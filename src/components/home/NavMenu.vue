
<template>
<el-menu
  :default-active='activeIndex2'
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  background-color="#cccccc"
  text-color="#000000"
  active-text-color="#4a86e8">
  <el-menu-item index="1">首页</el-menu-item>
  <el-submenu index="2">
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
  </el-submenu>
  <el-menu-item index="3">业务与产品</el-menu-item>
  <el-menu-item index="4">资质荣誉</el-menu-item>
  <el-menu-item index="5">合作伙伴</el-menu-item>
  <el-menu-item index="6">服务与下载</el-menu-item>
  <el-menu-item index="7">招贤纳士</el-menu-item>
  <!--<el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>-->
</el-menu>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>