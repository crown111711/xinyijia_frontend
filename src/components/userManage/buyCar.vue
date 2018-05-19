<template>
  <div>
    <el-table :data="cart_list" @selection-change="handleSelectionChange" width="100%" align=center>
      <el-table-column type="selection"></el-table-column>

      <el-table-column label="商品名称" prop="productName"></el-table-column>
      <el-table-column label="购买数量">
        <template slot-scope="scope">
          <div class="div_number">
            <el-input-number :min="1" change="handleChange(scope.row)" size="mini" v-model="scope.row.quantity"></el-input-number>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="商品单价" prop="price"></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="danger" @click="deleteBuyCar(scope.$index, scope.row)">移出购物车</el-button>
        </template>
      </el-table-column>

    </el-table>
    <el-row>
      <el-col :span="8">
        <span style="font-size:12px">共 {{cart_list.length}}类商品，已选择 {{total_num}} 件</span>
      </el-col>
      <el-col :span="16">
        <span>合计： {{total_price}}元</span>
        <el-button type="primary" @click="buyProduct">去结算</el-button>
        <el-button type="info" @click="back"> 返回浏览其他商品 </el-button>
      </el-col>

    </el-row>
  </div>
</template>
<script>
  import router from '../../router'
  import api from '../../api/index'

  export default {
    data() {
      return {

        cart_list: [
          //     {
          //     id: '',
          //     productName: "nginx",
          //     quantity: 3,
          //     price: 10,
          //     productId: '',

          //   }
        ],
        check_list: []
      }
    },
    methods: {
      back() {
        this.$router.go(-1)
      },
      handleSelectionChange: function (val) {
        this.check_list = val
      },
      handleChange: function (val) {
        console.log(val)
      },
      deleteBuyCar(index, row) {
        api.deleteBuyCar(row.id).then(res => {
          if (res.data.code === 0) {
            this.getBuyCars();
          }
        })
      },
      buyProduct() {
        let params = {
          userName: sessionStorage.getItem('userName'),
          accessToken: sessionStorage.getItem('accessToken'),
          trades: this.check_list

        }
        api.buyProduct(params).then(
          res => {
            if (res.data.code === 0) {
              this.$message({
                showClose: true,
                message: "购买成功",
                type: "success"
              })
              router.push({
                name: 'UserManager',
                params: {
                  defaultTab: "tradeInfo"
                }
              })
            } else if (res.data.code === 1) {
              this.$message({
                showClose: true,
                message: "购买失败，余额不足",
                type: "error"
              })
            } else if (res.data.code === 3) {
              this.$message({
                showClose: true,
                message: "购买失败，库存不足",
                type: "error"
              })
            }

          }
        )

      },
      getBuyCars() {
        let accessToken = sessionStorage.getItem('accessToken')
        api.getBuyCars(accessToken).then(res => {
          this.cart_list = res.data.data
        })
      }
    },

    computed: {
      total_num: function () {
        let num = 0
        this.check_list.forEach((item) => {
          num += item.quantity
        })
        return num
      },
      total_price: function () {
        let sum_price = 0
        this.check_list.forEach((item) => {
          sum_price += item.quantity * item.price
        })
        return sum_price
      }
    },
    created() {
      // this.cart_list = this.$store.getters.getBuyCar;
      this.getBuyCars();
    }
  }

</script>
