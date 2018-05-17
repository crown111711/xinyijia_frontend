<template>
  <el-carousel :interval="1000" type="card" height="200px" class="horse">
    <el-carousel-item v-for="item in 6" :key="item">
      <!--<h3>{{ item }}</h3>-->
      <img src= "../../assets/image/image1.jpg"> 
    </el-carousel-item>
  </el-carousel>
</template>
<<script>
export default {
  data () {
      return {
          imgUrl : require('../../assets/image/image1.jpg')
      }
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