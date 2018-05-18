<template>
  <div class="container">
    <h2>{{news.title}}</h2>
    <p class="sub">发布时间：{{news.publishTime}} | 发布者：{{news.author}}</p>
    <mavon-editor class="md" :value="news.content" :subfield="prop.subfield" :defaultOpen="prop.default_open ":toolbarsFlag="prop.toolbarsFlag"
      :editable="prop.editable" :scrollStyle="prop.scrollStyle"></mavon-editor>
    <!--<md-show :key="news.id" :mdvalue="news.content"></md-show>-->
    <back></back>
  </div>
</template>
<script>
  import adminApi from '../../../api/adminApi'
  import Back from '@/components/back'
  export default {
    components: {
      Back
    },
    data() {
      return {
        news: {},
        prop: {
          editable: false,
          toolbarsFlag: false,
          subfield: false,
          default_open: "preview",
          scrollStyle: true
        }
      }
    },
    methods: {
      curnews() {
        // let par = {
        //   params: {
        //     id: this.$route.params.id
        //   }
        // }
        let par = this.$route.params.id
        // console.log(par)
        adminApi.getNewsById(par).then(res => {
          // console.log(res)
          this.news = res.data.data
        })
      }
    },
    mounted() {
      this.curnews()
    }
  }

</script>
<style lang="less" scoped>
  .container {
    max-width: 1280px;
    .sub {
      color: #8f8f8c;
      font-size: 12px;
    }
  }

</style>
