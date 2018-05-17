<template>

  <el-row>
      <el-col :span="4" v-for="index in 10" :key="index" :offset="0 ">
        <el-card :body-style="{ padding: '14px' }">
          <img src="../../assets/image/hambuger.png" class="image">
          <div style="padding: 14px;">
            <span>好吃的汉堡</span>
            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>
              <el-button type="text" class="button"> <Icon type="ios-cart"></Icon>加入购物车</el-button>
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
  import {formatDate} from '../../assets/js/assist.js'
    export default {
      data() {
        return {
          currentDate: formatDate(new Date(),'yyyy-MM-dd HH:mm:ss')
        };
      },
      methods: {
        offsetImage: function (index) {

        }
      }
    }

  </script>
