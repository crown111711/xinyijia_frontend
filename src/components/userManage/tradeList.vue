<template>
  <el-table
    :data="tradeInfos"
    border
    style="width: 100%" align=center>
    <el-table-column
      prop="tradeTime"
      label="日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="productInfo.productName"
      label="产品名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="quantity"
      label="交易数量">
    </el-table-column>
    <el-table-column
      prop="price"
      label="成交价格">
    </el-table-column>
  </el-table>
</template>

<script>
import api from '../../api/index'
  export default {
    data() {
      return {
        tradeInfos: []
      }
    },
    methods: {
        
        getTradeInfos(){
            let accessToken = sessionStorage.getItem('accessToken')
            api.getTradeInfos(accessToken).then( res =>{
                this.tradeInfos = res.data.data
            })
        }
    },
    mounted () {
        this.getTradeInfos();
    }
  }
</script>