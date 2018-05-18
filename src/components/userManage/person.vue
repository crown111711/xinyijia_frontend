<template>
  <Form :model="formItem" :label-width="100">

    <FormItem label="头像" class="phHold">
      <!--<Input class="input" v-model="formItem.input" placeholder="请输入你的姓名" clearable></Input>-->
      <!--<el-upload class="prod-image" :action="uploadProductImage" :show-file-list="false" :on-success="handleSuccess" :before-upload="beforeUpload">

      <img :src="formItem.imageIcon" class=img />
        <i v-else class="el-icon-plus prod-uploader-icon"></i>
              </el-upload>-->

      <el-upload class="prod-image" :action="uploadProductImage" :show-file-list="false" :on-success="handleSuccess" :before-upload="beforeUpload">
        <img v-if="imageUrl" :src="imageUrl" class="cur-image" title="点击可更换头像" alt=''>
        <i v-else class="el-icon-plus prod-uploader-icon"></i>
      </el-upload>

    </FormItem>

    <FormItem label="姓名" class=input>
      <Input v-model="formItem.userName" placeholder="请输入你的姓名" width="100px" clearable></Input>
    </FormItem>
    <!--<FormItem label="Select">
            <Select v-model="formItem.select">
                <Option value="beijing">New York</Option>
                <Option value="shanghai">London</Option>
                <Option value="shenzhen">Sydney</Option>
            </Select>
        </FormItem>-->
    <FormItem label="生日" class=input>
      <Row>
        <Col span="11">
        <DatePicker type="date" placeholder="Select date" v-model="formItem.birthday"></DatePicker>
        </Col>
        <!--<Col span="2" style="text-align: center">-</Col>
                <Col span="11">
                    <TimePicker type="time" placeholder="Select time" v-model="formItem.time"></TimePicker>
                </Col><-->
      </Row>
    </FormItem>
    <FormItem label="性别" class=input>
      <RadioGroup v-model="formItem.sex">
        <Radio label="男">男</Radio>
        <Radio label="女">女</Radio>
      </RadioGroup>
    </FormItem>

    <FormItem label="邮箱" class=input>
      <Input v-model="formItem.email" readonly></Input>
    </FormItem>

    <FormItem label="电话号码" class=input>
      <Input v-model="formItem.telNum"></Input>
    </FormItem>


    <FormItem label="身份证号码" class=input>
      <Input v-model="formItem.idCard"></Input>
    </FormItem>

    <FormItem label="地址" class=input>
      <Input v-model="formItem.address" placeholder="请输入您的居住地址"></Input>
    </FormItem>

    <!--<FormItem label="Checkbox">
            <CheckboxGroup v-model="formItem.checkbox">
                <Checkbox label="Eat"></Checkbox>
                <Checkbox label="Sleep"></Checkbox>
                <Checkbox label="Run"></Checkbox>
                <Checkbox label="Movie"></Checkbox>
            </CheckboxGroup>
        </FormItem>-->

    <!--<FormItem label="是否开启智能推荐">
            <i-switch v-model="formItem.switch" size="large">
                <span slot="open">On</span>
                <span slot="close">Off</span>
            </i-switch>
        </FormItem>-->
    <!--<FormItem label="Slider">
            <Slider v-model="formItem.slider" range></Slider>
        </FormItem>-->
    <!--<FormItem label="Text">
      <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
    </FormItem>-->
    <FormItem class=input>
      <Button type="primary" @click="updateUserInfo">保存</Button>
      <!--<Button type="ghost" style="margin-left: 80px">Cancel</Button>-->
    </FormItem>

  </Form>
</template>
<script>
  import {
    getUserInfo
  } from '../../lib/vueHelper'
  import {
    updateBasicUserInfo
  } from '../../lib/vueHelper'

  import api from '../../api/index'
  import bus from '../../assets/js/eventBus'

  export default {
    data() {
      // this.formItem = getUserInfo(this).data
      return {
        imageUrl: '',
        imageName: '',
        formItem: {
          userName: 'tanjia',
          telNum: '',
          idCard: '',
          email: '',
          sex: '',
          address: '',
          birthday: '',
          imageIcon: ''
        }
      }
    },
    mounted() {
      this.getUserInfo();
      //   this.$on('handleChange', () => {
      //     this.getUserInfo();
      //     console.log('something handled!');
      //   });
    },
    methods: {

      handleSuccess(res, file) {
        this.imageUrl = res
        var index = res.lastIndexOf('/')
        this.imageName = res.substring(index + 1)
        this.formItem.imageIcon = this.imageName
      },
      // 商品主图再上传前对文件进行判断
      beforeUpload(file) {
        const isPIC = file.type === 'image/jpeg' || 'image/png'
        const isLt5M = file.size / 1024 / 1024 < 5

        if (!isPIC) {
          this.$message.error('上传图片只能是 JPG或PNG 格式!')
        }
        if (!isLt5M) {
          this.$message.error('上传图片大小不能超过 5MB!')
        }
        return isPIC && isLt5M
      },


      getUserInfo: function () {
        let accessToken = sessionStorage.getItem('accessToken');
        api.getUserInfo(accessToken).then(res => {
          if (res.data.code === 0) {
            this.formItem = res.data;
            this.imageUrl = "http://localhost:8090/xyj/api/attachment/showImage/" + res.data.imageIcon;
            //this.formItem.imageIcon = require('./../../assets/image/2.jpg')
          } else if (res.data.code === 1) {
            showMsg(this, true, "系统繁忙", 'error')
          } else if (res.data.code === 44) {
            showMsg(this, true, "用户尚未登陆", 'error')
          }
        }).catch(err => {
          console.log(err)
        })
      },
      updateUserInfo() {
        var data = this.formItem;
        data.accessToken = sessionStorage.getItem('accessToken')
        updateBasicUserInfo(this, data)
      }
    },
    computed: {
      uploadProductImage() {
        let accessToken = sessionStorage.getItem('accessToken')
        return 'http://localhost:8090/xyj/api/attachment/uploadFile?type=user' + "&accessToken=" + accessToken
      }
    },
    created() {
      bus.$on('b', (val) => {

        this.getUserInfo()
        console.log(val)
        //   console.log(val)
        //   let accessToken = sessionStorage.getItem('accessToken');
        //   api.getUserInfo(accessToken).then(res => {
        //   if (res.data.code === 0) {
        //     this.formItem = res.data;
        //     //this.formItem.imageIcon = require('./../../assets/image/2.jpg')
        //   } else if (res.data.code === 1) {
        //     showMsg(this, true, "系统繁忙", 'error')
        //   } else if (res.data.code === 44) {
        //     showMsg(this, true, "用户尚未登陆", 'error')
        //   }
        // }).catch(err => {
        //   console.log(err)
        // })
        console.log('something handled!');
      });
    }
  }

</script>
<style>
  .phHold {
    width: 500px;
  }

  .input {
    width: 500px;
    height: 50px;
    font-size: 24px;
    line-height: 30px;
  }

</style>
