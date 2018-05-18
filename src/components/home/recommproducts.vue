<template>

  <el-row>
    <el-col :span="4" v-for="item in products" :key="item.id" :offset="0 ">
      <el-card :body-style="{ padding: '14px' }">
        <router-link :to="'/product/'+ item.businessName +'/'+item.id" :key="item.id">
          <img :src="item.imageUrl" class="image" title="点击图片查看商品详情">
        </router-link>
        <div style="padding: 14px;">
          <span>{{item.productName}}</span>
          <div class="bottom clearfix">
            <time class="time">{{item.showTime}}</time>
            <el-button type="text" class="button" @click="addBuyCar(item)">
              <Icon type="ios-cart"></Icon>加入购物车</el-button>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<style>
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

</style>

<script>
  import {
    formatDate
  } from '../../assets/js/assist.js'
    import adminApi from '../../api/adminApi'

      import {
    addBuyCar
  } from '../../lib/vueHelper'

  export default {
    data() {
      return {
        products: [],
        currentDate: formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss')
      };
    },
    computed: {

    createTime(params) {
      return formatDate(new Date(params), 'yyyy-MM-dd HH:mm:ss')
    }

    },

    methods: {
        // 获取商品
      getprods() {
        // 获取分类列表
        let params = sessionStorage.getItem('accessToken')
        adminApi.recommendProduct(params).then(res => {
          // console.log(res)
          this.products = res.data.data
          for(var i = 0 ; i< this.products.length;i++){
            this.products[i].showTime = formatDate(new Date(this.products[i].createTime), 'yyyy-MM-dd HH:mm:ss')
          }
        })
      },

      addBuyCar(item){
        let params = {
          quantity: 1,
          price: item.price,
          userId: sessionStorage.getItem('uid'),
          productId: item.id
        }
        addBuyCar(this,params)
      },

      offsetImage: function (index) {

      }
    },
    mounted() {
      this.getprods()
    }
  }

</script>
