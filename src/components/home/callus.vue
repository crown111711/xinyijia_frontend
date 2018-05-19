<template>
  <div>
    <Topbar></Topbar>
    <NavMenu></NavMenu>
    <el-form :model="company" :rules="rules" ref="company" label-width="100px" class="demo-ruleForm">
      <el-form-item label="公司名称" prop="companyName">
        <el-input v-model="company.companyName" readonly></el-input>
      </el-form-item>

      <el-form-item label="电话" prop="companyTel">
        <el-input v-model="company.companyTel" readonly></el-input>
      </el-form-item>

      <el-form-item label="手机" prop="companyPhone">
        <el-input v-model="company.companyPhone" readonly></el-input>
      </el-form-item>

      <el-form-item label="邮箱" prop="email">
        <el-input v-model="company.email" readonly></el-input>
      </el-form-item>

      <el-form-item label="邮编" prop="emailCode">
        <el-input v-model="company.emailCode" readonly></el-input>
      </el-form-item>

      <el-form-item label="传真" prop="fax">
        <el-input v-model="company.fax" readonly></el-input>
      </el-form-item>

      <el-form-item label="公司规模" prop="size">
        <el-input v-model="company.size" readonly></el-input>
      </el-form-item>

      <el-form-item label="公司地址" prop="companyAddress">
        <el-input v-model="company.companyAddress" readonly></el-input>
      </el-form-item>

      <el-form-item label="公司网址" prop="webSite">
        <el-input v-model="company.webSite" readonly></el-input>
      </el-form-item>

      <el-form-item label="公司成立时间">
        <el-col :span="11">
          <el-form-item prop="createTime">
            <el-date-picker type="date" placeholder="选择日期" v-model="company.createTime" style="width: 100%;" readonly></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
      </el-form-item>

      <el-form-item label="公司描述" prop="companyDesc">
        <el-input type="textarea" v-model="company.companyDesc" readonly></el-input>
      </el-form-item>
    </el-form>


  </div>
</template>

<script>
  import adminApi from '../../api/adminApi'
  import Topbar from './topbar'
  import NavMenu from './NavMenu'
  export default {
    data() {
      return {
        company: {}
      }
    },
    components: {
      Topbar,
      NavMenu
    },
    methods: {

      getCompanyInfo() {
        adminApi.getCompany().then(res => {
          if (res.data.code === 0) {
            this.company = res.data.data
          }
        })
      }
    },
    created() {
      this.getCompanyInfo();
      this.$store.dispatch('updateIsHome', false)
      this.$store.dispatch('updateNavIndex', 'callus');
    }
  }

</script>
