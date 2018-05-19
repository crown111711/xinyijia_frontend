<template>
  <el-form :model="company" :rules="rules" ref="company" label-width="100px" class="demo-ruleForm">
    <el-form-item label="公司名称" prop="companyName">
      <el-input v-model="company.companyName"></el-input>
    </el-form-item>

    <el-form-item label="电话" prop="companyTel">
      <el-input v-model="company.companyTel" placeholder="023-1234567"></el-input>
    </el-form-item>

    <el-form-item label="手机" prop="companyPhone">
      <el-input v-model="company.companyPhone" placeholder="15919921384"></el-input>
    </el-form-item>

    <el-form-item label="邮箱" prop="email">
      <el-input v-model="company.email" placeholder="company@example.com"></el-input>
    </el-form-item>

    <el-form-item label="邮编" prop="emailCode">
      <el-input v-model="company.emailCode" placeholder="401331"></el-input>
    </el-form-item>

    <el-form-item label="传真" prop="fax">
      <el-input v-model="company.fax"></el-input>
    </el-form-item>

    <el-form-item label="公司规模" prop="size">
      <el-input v-model="company.size" placeholder="200-500"></el-input>
    </el-form-item>

    <el-form-item label="公司地址" prop="companyAddress">
      <el-input v-model="company.companyAddress"></el-input>
    </el-form-item>

    <el-form-item label="公司网址" prop="webSite">
      <el-input v-model="company.webSite"></el-input>
    </el-form-item>

    <el-form-item label="公司成立时间">
      <el-col :span="11">
        <el-form-item prop="createTime">
          <el-date-picker type="date" placeholder="选择日期" v-model="company.createTime" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
    </el-form-item>

    <el-form-item label="公司描述" prop="companyDesc">
      <el-input type="textarea" v-model="company.companyDesc"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('company')">更新公司信息</el-button>
      <el-button @click="resetForm('company')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import adminApi from '../../../api/adminApi'
  export default {
    data() {
      return {
        company: {
          id: '',
          companyName: '',
          companyTel: '',
          companyAddress: '',
          companyPhone: '',
          emailCode: '',
          email: '',
          createTime: '',
          fax: '',
          size: '',
          webSite: ''
        },
        rules: {
          //   companyName: [{
          //       required: true,
          //       message: '请输入公司名称',
          //       trigger: 'blur'
          //     },
          //     {
          //       min: 1,
          //       max: 15,
          //       message: '长度在 3 到 15 个字',
          //       trigger: 'blur'
          //     }
          //   ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(formName)
            console.log(this.company)
            adminApi.updateBasicInfo(this.company).then(res => {
              this.$notify({
                title: '成功!',
                type: 'success',
                message: '更新公司信息成功',
                offset: 200
              })

              this.getCompanyInfo();
            });
            // alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      getCompanyInfo() {
        adminApi.getCompany().then(res => {
          if (res.data.code === 0) {
            this.company = res.data.data
          }
        })
      }
    },
    created() {
      this.$store.dispatch('updateIsHome', false)
      this.getCompanyInfo()
    }
  };

</script>
