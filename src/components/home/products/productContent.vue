<template>
  <div class="container">
    <!-- head -->
    <div class="head">
      <el-row>
        <el-col class="left" :span="8" :xs="24">
          <img class="prodimg" :src="prod.imageUrl" alt="">
        </el-col>
        <el-col class="right" :span="16" :xs="24">
          <h3 v-text="prod.productName"></h3>
          <p v-text="prod.searchIndex"></p>
          <div class="info">
            <p class="price">价 格：<span class="yprice">￥{{prod.price}}</span></p>
            <!--<p v-if="user">折扣价：<span class="yprice">￥{{prod.price * user.zhekou * 0.1}}</span></p>-->
            <p>历史销量：{{prod.sellNum}}</p>
            <div>
              <p v-if="prod.selling" class="hot">热销中</p>
              <p v-else class="nhot">暂停销售</p>
            </div>
          </div>
          <div class="action">
            <el-button type="danger" @click="tosend" :disabled="disabled">加入购物车</el-button>
            <el-button type="info" @click="back">返回浏览其它商品</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- body -->
    <div class="body">
      <h4 class="tit">产品详情</h4>
      <mavon-editor class="md" :value="prod.productDesc" :subfield="prop.subfield" :defaultOpen="prop.default_open" :toolbarsFlag="prop.toolbarsFlag"
        :editable="prop.editable" :scrollStyle="prop.scrollStyle"></mavon-editor>
      <!--<md-show :key="prod._id" :mdvalue="prod.info"></md-show>-->
    </div>
  </div>
</template>
<script>
  import adminApi from '../../../api/adminApi'
  import store from '../../../vuex/store'
  export default {
    data() {
      return {
        prod: {},
        product: {},
        prop: {
          editable: false,
          toolbarsFlag: false,
          subfield: false,
          default_open: "preview",
          scrollStyle: true
        }
      }
    },
    computed: {
      // ...
      user() {
        return this.$store.getters.showState
      },
      hasuser() {
        if (this.user) {
          return 'nprice'
        } else {
          return 'yprice'
        }
      },
      disabled() {
        if (this.prod.selling) {
          return false
        } else {
          return true
        }
      }
    },
    methods: {
      CurProd() {
        // let params = {
        //   name: this.$route.params.productname,
        //   type: this.$route.params.class
        // }
        let params = {
          productId: this.$route.params.id
        }
        adminApi.getProductsInBusiness(params).then(res => {
          console.log(res)
          console.log("res.data.data"+res.data.data)
          this.prod = res.data.data[0]
          this.product = res.data.data[0]
          if(this.prod.selling === true){
              console.log("prod 不为null")
          }
          console.log(this.prod)
        })
      },
      tosend() {
        this.$router.push('/manger/send')
      },
      back() {
        this.$router.go(-1)
      }
    },
    mounted() {
      this.CurProd()
    }
  }

</script>
<style lang="less" scoped>
  @import '../../../assets/css/index.less';
  .container {
    width: 100%;
    margin: 65px auto;
    max-width: 1280px;
    .head {
      text-align: left;
      border-bottom: 1px solid rgba(92, 97, 92, .3);
      .left {
        padding: 10px 10px;
        border-right: 1px solid rgba(51, 112, 51, 0.2);
        .prodimg {
          width: 100%;
          border: 1px solid rgba(92, 97, 92, .3);
          border-radius: 15px;
        }
      }
      .right {
        padding: 5px 10px 10px 10px;
        .info {
          color: rgb(116, 114, 114);
          padding: 5px 10px;
          border: 1px solid rgba(196, 190, 190, .4);
          border-radius: 5px; // font-size: 14px;
          .yprice {
            color: red;
            font-size: 20px;
          }
          .nprice {
            text-decoration: line-through;
          }
          .hot {
            background: #bb4945;
            color: rgb(231, 228, 228);
            margin: 0;
            padding: 5px 12px;
            display: inline-block;
          }
          .nhot {
            background: #dad7d5;
            color: rgb(61, 57, 57);
            margin: 0;
            padding: 5px 12px;
            display: inline-block;
          }
        }
        .action {
          padding: 10px 5px;
        }
      }

    }
    .body {
      .tit {
        .leftborder;
        margin: 20px 0;
      }
    }
  }

</style>
