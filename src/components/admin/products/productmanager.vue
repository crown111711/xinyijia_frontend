<template>
<div>
  <Topbar> </Topbar>
  <el-tabs v-model="defaultTab" @tab-click="handleClick">
    <el-tab-pane label="产品列表" name="产品列表">
    <AllProds> </AllProds>    
    </el-tab-pane>
    <el-tab-pane label="增加产品" name="增加产品">
        <AddProd> </AddProd>
   </el-tab-pane>
    <el-tab-pane label="业务线管理" name="业务线管理"> 
        <AddBusiness></AddBusiness>
    </el-tab-pane>
  </el-tabs>
</div>
</template>
<script>
  import AllProds from "./allprods"
  import AddProd from "./addprod"
  import AddBusiness from "./addBusiness"
  import Topbar from "../../home/topbar"
  import NavMenu from "../../home/NavMenu"
  export default {
    data() {
      return {
        defaultTab: '产品列表',
        selectItem: ''
      };
    },
    components: {
      AllProds,
      AddProd,
      AddBusiness,
      Topbar,
      NavMenu
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    },
    mounted() {
      if (this.$route.params.defaultTab) {
        this.defaultTab = this.$route.params.defaultTab
        this.selectItem = this.$route.params.defaultTab
      }

      //按照设计用到topbar组件的地方都要更新这个，目的是重定向的问题
      this.$store.dispatch('updateIsHome', false)
    }
  };

</script>
