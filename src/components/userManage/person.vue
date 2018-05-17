<template>
  <Form :model="formItem" :label-width="100">

    <FormItem label="头像" class="phHold">
      <!--<Input class="input" v-model="formItem.input" placeholder="请输入你的姓名" clearable></Input>-->
      <img :src="formItem.imageIcon" class=img />
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
  import { updateBasicUserInfo } from '../../lib/vueHelper'

  import api from '../../api/index'
  import bus from '../../assets/js/eventBus'

  export default {
    data() {
      // this.formItem = getUserInfo(this).data
      return {
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
      getUserInfo: function () {
        let accessToken = sessionStorage.getItem('accessToken');
        api.getUserInfo(accessToken).then(res => {
          if (res.data.code === 0) {
            this.formItem = res.data;
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
      updateUserInfo(){
          var data = this.formItem;
          data.accessToken = sessionStorage.getItem('accessToken')
          updateBasicUserInfo(this,data)
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
