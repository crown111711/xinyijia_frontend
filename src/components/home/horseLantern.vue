<template>
  <el-carousel :interval="1000" type="card" height="200px" class="horse">
    <el-carousel-item v-for="item in news" :key="item.id">
      <!--<h3>{{ item }}</h3>-->
      <img :src= "item.imageUrl"> 
    </el-carousel-item>
  </el-carousel>
</template>
<script>
  import adminApi from '../../api/adminApi'
export default {
  data () {
      return {
          news:[]
      }
  },
  methods: {
      getnews() {
        let par = {
          limit: 12
        }
        adminApi.getNews().then(res => {
          // console.log(res)
          let temp = res.data.data;
        
          for (var i = 0; i < temp.length; i++) {
            if(temp[i].imageUrl != null ){
                this.news.push(temp[i])
            }
           // this.news[i].showMsg = this.news[i].title + " [" + this.news[i].type + "]   " + this.news[i].publishTime;
          }
          console.log(this.news)
        })
      }
    },
    mounted () {
      this.getnews();
    }
}
</script>

<style scoped >

.horse {
    /*width: 500px;*/
    height:100%;
    background-color: #666666;
    }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>