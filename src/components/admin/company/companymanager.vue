<template>
  <div>
    <Topbar> </Topbar>
    <el-tabs v-model="defaultTab" @tab-click="handleClick">
      <el-tab-pane label="基本信息" name="基本信息">
          <CompanyBasic> </CompanyBasic>
      </el-tab-pane>
      <!--<el-tab-pane label="资质荣誉" name="资质荣誉">
      </el-tab-pane>-->
      <el-tab-pane label="关于新亿嘉" name="关于新亿嘉">
          <About></About>
      </el-tab-pane>
      <el-tab-pane label="招贤纳士" name="招贤纳士">
          <recruit> </recruit>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import Topbar from "../../home/topbar"
  import adminApi from '../../../api/adminApi'
  import CompanyBasic from './companyBasic'
  import About from './about'
  import recruit from './recruit'
  export default {
    data() {
      return {
        company: {},
        defaultTab:'基本信息'
      }
    },
    components: {
      Topbar,
      CompanyBasic,
      About,
      recruit
    },
    created() {
      this.$store.dispatch('updateIsHome', false)
      adminApi.getCompany().then(res => {
        if (res.data.code === 0) {
          this.company = res.data.data
        }
      })
    }
  }

</script>
