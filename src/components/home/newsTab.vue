<template>
  <el-tabs v-model="activeName2" type="card" @tab-click="handleClick" class="newstab">
    <el-tab-pane label="公司新闻" name="first">
    <Scroll >
      <el-card class="box-card" v-if="news">
        <div v-for="item in news" :key="item.id" class="text item">
          <router-link :to="'/newsContent/'+item.id" :key="item.id">
            {{item.showMsg}}
          </router-link>
        </div>
      </el-card>
    </Scroll>
    </el-tab-pane>
    <el-tab-pane label="专题报道" name="second">
      <Scroll>
      <el-card v-if="news" class="box-card">
        <div v-for="item in news" :key="item.id" class="text item">
          <router-link :to="'/newsContent/'+item.id" :key="item.id">
            {{item.showMsg}}
          </router-link>
        </div>
      </el-card>
      </Scroll>
    </el-tab-pane>

    <el-tab-pane label="媒体报道" name="third">
      <Scroll>
      <el-card class="box-card" v-if="news">
        <div v-for="item in news" :key="item.id" class="text item">
          <router-link :to="'/newsContent/'+item.id" :key="item.id">
            {{item.showMsg}}
          </router-link>
        </div>
      </el-card>
      </Scroll>
    </el-tab-pane>
    <el-tab-pane label="动态通知" name="fourth">
      <Scroll>
      <el-card class="box-card" v-if="news" >
        <div v-for="item in news" :key="item.id" class="text item">
          <router-link :to="'/newsContent/'+item.id" :key="item.id">
            {{item.showMsg}}
          </router-link>
        </div>
      </el-card>
      </Scroll>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
  import adminApi from '../../api/adminApi'
  export default {
    data() {
      return {
        activeName2: 'first',
        news: []
      };
    },
    methods: {
      handleClick(tab, event) {
        var index = tab.index
        switch(index){
          case "0" : 
          this.getnews("公司新闻")
          break;
          case "1" :
          this.getnews("专题报道")
          break;
          case "2" :
          this.getnews("媒体报道")
          break;
          case "3" :
          this.getnews("动态通知")
          break;
        }
        console.log(tab, event);

      },
      getnews(category) {
        let par = {
          limit: 12
        }
        adminApi.getNews(category).then(res => {
          // console.log(res)
          this.news = res.data.data;
          for (var i = 0; i < this.news.length; i++) {
            this.news[i].showMsg = this.news[i].title + " [" + this.news[i].type + "]   " + this.news[i].publishTime;
          }
        })
      }
    },
    mounted() {
      this.getnews("公司新闻")
    }
  };

</script>


<style>
  .text {
    font-size: 14px;
  }

  .item {
    padding: 10px 0;
    text-align: left
  }

  .box-card {
    width: 100%;
    height: 100%;
  }

  .newstab {}

</style>
