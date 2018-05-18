<template>
  <div class="layout">
    <Layout :style="{minHeight: '100vh'}">
      <Sider collapsible :collapsed-width="78" v-model="isCollapsed">
        <Menu :active-name="defaultTab" theme="dark" width="auto" :class="menuitemClasses" @on-select="menuSelect">
          <MenuItem name="userInfo">
          <!--@click.native="goTo"-->
          <Icon type="person"></Icon>
          <span>个人资料</span>
          </MenuItem>
          <MenuItem name="account">
          <Icon type="social-usd"></Icon>
          <span>账户信息</span>
          </MenuItem>
          <MenuItem name="tradeInfo">
          <Icon type="ios-list"></Icon>
          <span>交易信息</span>
          </MenuItem>
        </Menu>
      </Sider>
      <Layout>
        <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}"></Header>
        <Content :style="{padding: '0 16px 16px'}">

          <Tabs type="card" v-if="selectItem == 'userInfo'" @on-click="tabSelect">
            <TabPane v-for="tab in tabs" :key="tab" :label="tab">
              <v-Person ref="person" v-if="tab == '基本资料'"></v-Person>
            </TabPane>
            <!--<Button type="ghost" @click="handleTabsAdd" size="small" slot="extra">增加</Button>-->
          </Tabs>

          <div v-if="selectItem == 'account'" class="account">
            <p class="sellnum"> <span>{{tip}} </span> </p>
            <Input v-model="balance" placeholder="请输入充值金额" clearable style="width: 300px"></Input>
            <Button type="primary" @click="recharge">确定充值</Button>
          </div>

          <trade-list v-if="selectItem == 'tradeInfo'"> </trade-list>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>
<script>
  import router from '../../router'
  import vPerson from './person'
  import tradeList from './tradeList'
  import api from '../../api/index'
  import bus from '../../assets/js/eventBus'
  import {
    getUserInfo
  } from '../../lib/vueHelper'
  export default {
    data() {
      return {
        isCollapsed: false,
        tabs: ["基本资料"],
        //, "图像照片"
        selectItem: 'userInfo',
        userInfo: {},
        balance: '',
        tip: '',
        defaultTab: 'userInfo'
      }
    },
    components: {
      vPerson,
      tradeList
    },
    created() {
      console.log(this.$refs)
      console.log("sss")
      this.getAccount()
    },
    computed: {
      menuitemClasses: function () {
        return [
          'menu-item',
          this.isCollapsed ? 'collapsed-menu' : ''
        ]
      }
    },

    methods: {
      //   handleTabsAdd() {
      //     this.tabs++;
      //   },


      recharge() {
        let params = {
          accessToken: sessionStorage.getItem('accessToken'),
          balance: this.balance
        }

        api.recharge(params).then(res => {
          if (res.data.code === 0) {
            this.$message({
              showClose: true,
              message: "充值成功",
              type: "success"
            })
            this.getAccount();
          } else {
            this.$message({
              showClose: true,
              message: "充值失败，请稍后再次充值",
              type: "error"
            })
          }
        }).catch(err => {
          coonsole.log(err)
        })
      },

      getAccount: function () {
        let accessToken = sessionStorage.getItem('accessToken');
        api.getUserInfo(accessToken).then(res => {
          if (res.data.code === 0) {
            this.userInfo = res.data;
            this.tip = "尊贵的 " + res.data.userName + (res.data.sex == '男' ? '先生' : '女士') + "," + "你的账户余额为" + ": " +
              res.data.balance
            console.log(this.tip)
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

      menuSelect(name) {
        this.selectItem = name;
        switch (name) {

        }
      },
      tabSelect(name) {
        switch (name) {
          case 0:
            this.getUserInfo();
            break;
        }
      },
      getUserInfo() {

        //     let accessToken = sessionStorage.getItem('accessToken');
        //   api.getUserInfo(accessToken).then(res => {
        //     if (res.data.code === 0) {
        //       Person.$data = res.data;
        //       //this.formItem.imageIcon = require('./../../assets/image/2.jpg')
        //     } else if (res.data.code === 1) {
        //       showMsg(this, true, "系统繁忙", 'error')
        //     } else if (res.data.code === 44) {
        //       showMsg(this, true, "用户尚未登陆", 'error')
        //     }
        //   }).catch(err => {
        //     console.log(err)
        //   })
        console.log(this.$children)
        console.log(this.$children.length)
        bus.$emit('b', "sss");

      },
      goTo() {
        router.push({
          path: '/'
        })
      }
    },
    mounted() {
      this.getAccount()
      console.log(this.$route.params.defaultTab)
      if (this.$route.params.defaultTab) {
        this.defaultTab = this.$route.params.defaultTab
        this.selectItem = this.$route.params.defaultTab
      }
      console.log(this.defaultTab)
    }
  }

</script>

<style scoped>
  .sellnum {
    margin: 0 15px 0 25px;
    text-align: center;
    color: #666;
    line-height: 20;
    letter-spacing: 1.2;
  }

  .layout-con {
    height: 100%;
    width: 100%;
  }

  .menu-item span {
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
  }

  .menu-item i {
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 16px;
  }

  .collapsed-menu span {
    width: 0px;
    transition: width .2s ease;
  }

  .collapsed-menu i {
    transform: translateX(5px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px;
  }

  .account {
    text-align: center
  }

</style>
