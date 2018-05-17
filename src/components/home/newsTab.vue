<template>
  <el-tabs v-model="activeName2" type="card" @tab-click="handleClick" class="newstab">
    <el-tab-pane label="公司新闻" name="first">
        <ol> 
            <li>我公司发财了</li>
            <li>我公司员工即将涨工资</li>
        </ol>
    </el-tab-pane>
    <el-tab-pane label="专题报道" name="second"></el-tab-pane>
    <el-tab-pane label="媒体报道" name="third"></el-tab-pane>
    <el-tab-pane label="动态通知" name="fourth"></el-tab-pane>
  </el-tabs>
</template>
<script>
  export default {
    data() {
      return {
        activeName2: 'first'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>


<style>
.newstab {

}


</style>
