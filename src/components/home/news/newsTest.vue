<template>


  <el-card class="box-card">
    <div v-for="item in news" :key="item.id" class="text item">
      <router-link :to="'/allNews'":key="item.id">
       {{'列表内容 '+item.showMsg}}
      </router-link>
    </div>
  </el-card>
  <!--<div class="container">
    <h2>新闻动态</h2>
    <div class="main">
      <el-row>
        <template v-for="item in news">
          
          <el-col class="item" :span="8" :xs="24" :key="item.id">
            <h4>{{item.title}}</h4>
            <p class="sub">{{item.publishTime}}</p>
            <router-link :to="'/news/' + item._id" :key="item._id">
              <img class="img hvr-float" :src="item.imageUrl" alt="">
            </router-link>
          </el-col>
        </template>
      </el-row>
    </div>
  </div>-->
</template>
<script>
  import adminApi from '../../../api/adminApi'
  export default {
    data() {
      return {
        news: []
      }
    },
    methods: {
      getnews() {
        let par = {
          limit: 12
        }
        adminApi.getNews().then(res => {
          // console.log(res)
          this.news = res.data.data;
          for (var i = 0; i < this.news.length; i++) {
            this.news[i].showMsg = this.news[i].title + " [" + this.news[i].type + "]   " + this.news[i].publishTime;
          }
        })
      }
    },
    mounted() {
      this.getnews()
    }
  }

</script>
<style lang="less" scoped>
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
    text-align: left
  }

  .box-card {
    width: 480px;
  } //   @import '../../../assets/css/init.css';
  //   @import '../../../assets/css/index.less';
  .container {
    max-width: 1280px;
    .main {
      //   background: rgb(245, 245, 245);
      .item {
        text-align: left;
        padding: 20px 10px; // .sub {
        //   font-size: 12px;
        //   color: rgb(107, 104, 104);
        // }
        // .img {
        //   width: 100%;
        //   cursor: pointer;
        // }
      }
    }
  }

</style>
