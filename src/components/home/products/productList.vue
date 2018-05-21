<template>
  <div>
    <div class="serch">
      <!-- 搜索框 -->
      <el-input type="text" class="el-input" placeholder="请输入商品名或商品查询关键字" v-model="searchName">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-button type="primary" :disabled="disabled" @click="search" :loading="loading">
        搜索
      </el-button>
    </div>
    <div class="title">
      <h1 v-text="$route.params.class"></h1>
    </div>
    <!-- <p>共{{productlist.length}}个商品</p> -->
    <el-row class="main" style="margin:20px auto;max-width: 1200px"   :offset="0">
      <!--<template v-for="item in productlist">-->
        <el-col :span="7" style="margin-bottom:40px;" v-for="item in productlist" :xs="22" class="item hvr-float-shadow" :key="item.businessName">
          <el-card :body-style="{padding: '0px'}">
            <div style="height: 250px;overflow:hidden">
          <router-link :to="'/product/'+item.businessName+'/'+item.id" :key="item.id">
            <img style="width: 100%;display: block;" class="hvr-bob" :src="item.imageUrl">
          </router-link>
            </div>
          <div class="onpic">
            <p v-if="item.selling" class="hot">热销中</p>
            <p v-else class="nhot">未上市</p>
          </div>
          <h3>{{item.businessName}}</h3>
          <p class="intro">{{item.searchIndex}}</p>
          <p class="sellnum">历史销量:<span>{{item.sellNum}}</span></p>
          <p class="price">全国包邮价:<span class="textOld">{{item.price}}</span>
          <el-button type="text" class="button" @click="addBuyCar(item)"> <Icon type="ios-cart"></Icon>加入购物车</el-button>
          <!--<span class="textOld" v-if="sender">￥{{item.price * sender.zhekou * 0.1}}</span>-->
          </p>
          </el-card>
        </el-col>
      <!--</template>-->
    </el-row>
    <!-- 分页 -->
    <!-- <div class="page">
      <el-pagination
        layout="prev, pager, next"
        :total="50"
        @current-change="handleCurrentChange"
        :page-size="12">
      </el-pagination>
    </div> -->
  </div>
</template>
<script>
  import adminApi from '../../../api/adminApi'
   import {
    addBuyCar
  } from '../../../lib/vueHelper'
  export default {
    data() {
      return {
        productlist: [], // 商品列表
        searchName: '',
        loading: false
      }
    },
    methods: {
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
      },

      addBuyCar(item) {
        let params = {
          quantity: 1,
          price: item.price,
          userId: sessionStorage.getItem('uid'),
          productId: item.id
        }
        addBuyCar(this, params)
      },
      // 获取商品
      getprods() {
        // 获取分类列表
        let params = null
        console.log(this.$route.params.class )
        if (this.$route.params.class === '全部商品') {
          params = {
           businessName :"全部商品"
          }
        } else {
          params = {
            businessName: this.$route.params.class
          }
        }
        adminApi.getProductsInBusiness(params).then(res => {
          // console.log(res)
          this.productlist = res.data.data
        })
      },
      // 搜索商品
      search() {
        this.loading = true
        let searchparams = {
          searchParam: this.searchName,
          searchBusiness: this.$route.params.class 
        }
        adminApi.searchProducts(searchparams).then(res => {
          this.loading = false
          // console.log(res)
          if (res.data.data.length === 0) {
            this.$notify({
              title: '很抱歉',
              message: '没有搜索到符合的商品！',
              type: 'warning',
              offset: 200
            })
            this.searchName = ''
          } else {
            this.$notify({
              title: '成功',
              message: '共搜索到' + res.data.data.length + '件商品',
              type: 'success',
              offset: 200
            })
            this.productlist = res.data.data
            this.searchName = ''
          }
        })
      }
    },
    computed: {
    //   sender() {
    //     return this.$store.getters.sender
    //   },
    //   old() {
    //     if (this.sender) {
    //       return 'textThr'
    //     } else {
    //       return 'textOld'
    //     }
    //   },
      disabled() {
        if (this.searchName === '') {
          return true
        } else {
          return false
        }
      }
    },
    mounted() {
      this.getprods()
    }
  }

</script>
<style lang="less" scoped>
    @import '../../../assets/css/init.css';
    @import '../../../assets/css/index.less';
  .serch {
    margin: 20px 10px;
    .el-input {
      width: 70%;
    }
    .el-button {
      width: 28%;
    }
  }

  a {
    text-decoration: none;
    color: #999;
  }

  a:hover {
    color: #669966;
  }

  .title {
    height: 60px;
    border-left: 4px solid #669966;
    margin: 0 15px;
    background-color: #f2f3f2;
    text-align: left;
    padding-left: 20px;
    line-height: 60px;
  }

  .main {
    position: relative;
    .item {
      margin: 25px 10px;
      /* background: #f2f3f2; */
      // box-shadow: 0 5px 5px #ccc;
      // border-top: 1px solid #ccc;
      // /* border: 1px solid #ccc; */
      // border-radius: 15px;
      .onpic {
        position: relative;
        top: 20px;
        right: 20px;
        opacity: .7;
        left: 100px;
        .hot {
          background: #bb4945;
          color: rgb(231, 228, 228);
          margin: 0;
          padding: 5px 12px;
          border-radius: 15px;
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
      img {
        width: 90%;
        padding: 10px;
        border-radius: 15px;
      }
    }
  }

  .intro {
    height: 90px;
    overflow: hidden;
  }

  .intro,
  .price,
  .sellnum {
    margin: 0 15px 0 25px;
    text-align: left;
    color: #666;
    line-height: 2;
    letter-spacing: 1.2;
  }

  .link {
    text-align: right;
    font-size: 16px;
    margin-right: 40px;
  }

  .price,.sellnum {
    color: gray;
  }

  .textOld {
    color: red;
    font-size: 25px;
  }

  .textThr {
    // color: #290c09;
    // font-size: 20px;
    text-decoration: line-through;
  }

</style>
