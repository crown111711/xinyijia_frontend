<template>
  <div class="section">
    <!-- 添加商品类 -->
    <div class="addprod">
      <h4>添加一个业务线</h4>
      <el-input placeholder="请输入业务线" v-model="businessName" clearable>
      </el-input>
      <el-input placeholder="业务线负责人" v-model="principalOwner" clearable>
      </el-input>
      <el-input placeholder="请输入业务线简介" v-model="businessDesc" type="textarea" :rows="2" clearable>
      </el-input>
      <el-button type="danger" :disabled="disabled" @click="addtype" round>添加</el-button>
    </div>
    <!-- 获取商品分类 -->
    <div class="getproducts">
      <h4>所有业务线</h4>
      <el-table :data="products" style="width: 100%" align=center>
        <el-table-column min-width="20%" prop="businessName" label="业务线名称">
        </el-table-column>
        <el-table-column min-width="20%" prop="principalOwner" label="业务线负责人">
        </el-table-column>
        <el-table-column min-width="20%" prop="businessDesc" label="业务线简介">
        </el-table-column>
        <el-table-column min-width="20%" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="EditProducts(scope.$index, scope.row)">修改业务线信息</el-button>
            <el-button type="danger"  @click="deleteBusiness(scope.$index, scope.row)">删除业务线信息</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 修改商品分类 -->
      <el-dialog title="修改业务线" :visible.sync="dialogFormVisible">
        <el-form ref="editproduct" :model="selectedProduct" label-width="100px">
          <el-form-item label="业务线名称">
            <el-input placeholder="请输入业务线名" v-model="selectedProduct.businessName" clearable>
            </el-input>
          </el-form-item>
          <el-form-item label="业务线负责人">
            <el-input placeholder="请输入业务线负责人" v-model="selectedProduct.principalOwner" clearable>
            </el-input>
          </el-form-item>
          <el-form-item label="业务线简介">
            <el-input placeholder="请输入业务线简介" v-model="selectedProduct.businessDesc" clearable>
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="exitEdit">取 消</el-button>
          <el-button type="primary" @click="submitEdit">确定修改</el-button>
        </div>
      </el-dialog>
    </div>
  </div>

</template>
<script>
  import adminApi from '../../../api/adminApi'
  //import {NewProducts, GetProducts, EditProduct} from '../../../api/adminApi'
  export default {
    data() {
      return {
        products: [],
        businessName: '',
        principalOwner: '',
        businessDesc: '',
        id: '',
        dialogFormVisible: false,
        selectedProduct: {
          id: '',
          businessName: '',
          principalOwner: '',
          businessDesc: ''
        }
      }
    },
    computed: {
      disabled() {
        if (this.businessName === '' || this.principalOwner === '' || this.businessDesc === '') {
          return true
        } else {
          return false
        }
      }
    },
    methods: {
      // 添加商品分类
      addtype() {
        let newproductsParams = {
          businessName: this.businessName,
          principalOwner: this.principalOwner,
          businessDesc: this.businessDesc
        }
        adminApi.addBusiness(newproductsParams).then(res => {
          // console.log(res)
          if (res.data.code === 0) {
            this.$notify({
              title: '成功',
              type: 'success',
              message: res.data.msg,
              offset: 200
            })
            newproductsParams.id = res.data.data
            this.products.unshift(newproductsParams)
            this.businessName = ''
            this.principalOwner = ''
            this.businessDesc = ''
          } else {
            this.$message({
              showClose: close,
              message: res.data.msg,
              type: 'error'
            })
          }
        }).catch(err => {
          console.log(err)
        })
      },

      deleteBusiness(row, rowIndex) {
        adminApi.deleteBusiness(rowIndex.id).then(
          res => {
            if (res.data.code === 0) {
              let index = -1;
              for (let i = 0; i < this.products.length; i++) {
                if (this.products[i].id === rowIndex.id) {
                  index = i;
                }
              }
              if (index != -1) {
                this.products.splice(index, 1)
              }
              this.$notify({
                title: '成功',
                type: 'success',
                message: '删除成功',
                offset: 200
              })

            } else {
              this.$notify({
                title: '失败',
                type: 'error',
                message: res.data.msg,
                offset: 200
              })
            }
          })
      },
      // 修改商品分类
      EditProducts(row, rowIndex) {
        // console.log(row, rowIndex)
        this.selectedProduct = rowIndex
        this.dialogFormVisible = true
      },
      // 取消修改
      exitEdit() {
        this.$notify({
          title: '取消',
          type: 'primary',
          message: '已取消修改',
          offset: 200
        })
        this.dialogFormVisible = false
      },
      // 确定修改
      submitEdit() {
        let editpar = {
          id: this.selectedProduct.id,
          businessName: this.selectedProduct.businessName,
          principalOwner: this.selectedProduct.principalOwner,
          businessDesc: this.selectedProduct.businessDesc
        }
        console.log(editpar)
        adminApi.updateBusiness(editpar).then(res => {
          // console.log(res)
          this.$notify({
            title: '成功',
            type: 'success',
            message: res.data.msg,
            offset: 200
          })
          this.dialogFormVisible = false
        })
      },
      // 获取商品分类
      GetProducts() {
        let par = {
          type: 'all'
        }
        adminApi.getAllBusiness(par).then(res => {
          // console.log(res)
          this.products = res.data
        })
      }
    },
    mounted() {
      this.GetProducts()
    }
  }

</script>
<style lang="less" scoped>
  @import '../../../assets/css/init.css';
  @import '../../../assets/css/index.less';
  .addprod {
    .learncontent;
    .el-input {
      margin: 5px 0;
    }
    .el-button {
      margin: 10px 0;
      width: 100%;
    }
  }

  .getproducts {
    .learncontent;
  }

</style>
