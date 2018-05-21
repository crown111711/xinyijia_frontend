<template>
  <div class="section">
    <div class="serchprod">
      <h4>搜索商品</h4>
      <!-- 搜索框 -->
      <el-input class="serch-input" v-model="productName" placeholder="请输入确切的商品名、商品查询关键字、商品类型进行查询">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-button class="serch-btn" @click="SerchProd" :disabled="disable" type="primary">搜索</el-button>
      <!--@keyup.enter="SerchProd()"-->
    </div>
    <!-- 所有商品 -->
    <div class="allprod">
      <h4>所有商品</h4>
      <el-table :data="products" style="width: 100%" align=center>
        <el-table-column prop="productName" label="商品名" min-width="20%">
        </el-table-column>
        <el-table-column prop="price" label="价格" min-width="10%">
        </el-table-column>
        <el-table-column prop="imageName" label="图片" min-width="30%">
          <template slot-scope="scope">
            <img class="table-image" :src="scope.row.imageUrl" alt="">
          </template>
        </el-table-column>
        <el-table-column prop="businessId" label="商品业务线" min-width="10%" :filters="businessFilter" :filter-method="filterType" filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag close-transition>{{scope.row.businessName}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column min-width="20%" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="EditProd(scope.$index, scope.row)">编辑商品</el-button>
            <el-button type="danger" @click="deleteProd(scope.$index, scope.row)">删除商品</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 编辑商品 -->
    <el-dialog title="编辑商品" :visible.sync="dialogFormVisible" width="90%">
      <el-form ref="editprod" :rules="prodrules" :model="editprod">
        <el-form-item label="商品名" prop="productName">
          <el-input v-model="editprod.productName" placeholder="请输入商品名"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model.number="editprod.price" placeholder="请输入商品价格"></el-input>
        </el-form-item>

        <el-form-item label="库存数量" prop="quantity">
          <el-input v-model.number="editprod.quantity" placeholder="请输入商品库存"></el-input>
        </el-form-item>

        <el-form-item label="商品主图" prop="imageName">
          <el-upload class="prod-image" :action="uploadProductImage" :show-file-list="false" :on-success="handleSuccess" :before-upload="beforeUpload">
            <img v-if="editprod.imageUrl" :src="editprod.imageUrl" class="cur-image">
            <i v-else class="el-icon-plus prod-uploader-icon"></i>
          </el-upload>
          <!--<qiniu-upload :key="imageUrl" :url="imageUrl" width="200" height="200" fontSize="40" ref="qnupload"></qiniu-upload>-->
        </el-form-item>
        <el-form-item label="商品业务线" prop="businessName">
          <el-select v-model="editprod.businessId" placeholder="请选择商品业务线">
            <template v-for="item in businessProducts">
              <el-option :label="item.businessName" :value="item.id" :key="item.id"></el-option>
            </template>
          </el-select>
        </el-form-item>

        <el-form-item label="商品类名" prop="category">
          <el-input v-model="editprod.category"></el-input>
        </el-form-item>

        <el-form-item label="是否上架">
          <el-switch v-model="editprod.selling"></el-switch>
        </el-form-item>

        <!--<el-form-item label="售卖时间" prop="selltime">
          <el-input v-model="editprod.selltime" placeholder="请请输入商品售卖时间，月份或全年"></el-input>
        </el-form-item>-->


        <el-form-item label="检索关键字" prop="searchIndex">
          <el-input v-model="editprod.searchIndex" placeholder="请输入该产品的检索关键字"></el-input>
        </el-form-item>

        <!--<el-form-item label="商品简介" prop="desc">
          <el-input type="textarea" v-model="editprod.productDesc" placeholder="请请输入商品简介"></el-input>
        </el-form-item>-->

        <el-form-item label="商品详情" prop="productDesc">
          <mavon-editor ref="md" @imgAdd="$imgAdd" @imgDel="$imgDel" v-model="editprod.productDesc"></mavon-editor>
          <!--<md-upload :key="editprod.info" :info="editprod.info" ref="mdedit"></md-upload>-->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitEdit">确 定</el-button>
        <el-button @click="exitEdit">取 消</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
  import adminApi from '../../../api/adminApi'

  import config from '../../../config'

  // import {UploadFile} from '../../../api/api'
  export default {
    // ..
    data() {
      return {
        productName: '',
        businessFilter: [],
        products: [],
        businessProducts: [],
        dialogFormVisible: false,
        imageUrl: '',
        editprod: {
          id: '',
          productName: '',
          price: '',
          businessId: '',
          category: '',
          selling: '',
          productDesc: '',
          searchIndex: '',
          quantity: '',
          imageName: '',
          businessName: '',
          imageUrl: '',
          createTime: '',
          sellNum: '',
        },
        prodrules: {
          productName: [{
              required: true,
              message: '请输入商品名',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 15,
              message: '长度在 3 到 15 个字',
              trigger: 'blur'
            }
          ],
          price: [{
              required: true,
              message: '请输入商品价格',
              trigger: 'blur'
            },
            {
              type: 'number',
              message: '价格必须是数字',
              trigger: 'blur'
            }
          ]
          // ,
          // category: [{
          //   required: true,
          //   message: '商品必须选择一个类别',
          //   trigger: 'change'
          // }]
          // ,
          // productDesc: [{
          //   required: true,
          //   message: '请输入商品简介',
          //   trigger: 'blur'
          // }]
          //   ,
          //   selltime: [{
          //     required: true,
          //     message: '商品售卖时间段是必须的！',
          //     trigger: 'blur'
          //   }]
        }
      }
    },
    computed: {
      disable() {
        if (this.productName.length !== 0) {
          return false
        } else {
          return true
        }
      },
      uploadProductImage() {
        let accessToken = sessionStorage.getItem('accessToken')
        return config.API_ROOT + 'attachment/uploadFile?type=product' + "&accessToken=" + accessToken
      }

    },
    // watch: {
    //   'editprod.typename': function (val) {
    //     // console.log(val)
    //     // console.log(this.products)
    //     const CurProduct = this.products.filter(p => {
    //       return p.name === this.editprod.typename
    //     })
    //     // console.log(CurProduct)
    //     this.editprod.type = CurProduct[0].type
    //     // console.log(this.addprod.type)
    //   },
    //   deep: true
    // },
    methods: {
      // 搜索商品
      SerchProd() {
        // let serchpar = {
        //   name: this.productName
        // }
        let serchpar = {
          "searchParam": this.productName,
          "searchBusiness": "全部商品"
        }
        adminApi.searchProducts(serchpar).then(res => {
          // console.log(res)
          if (res.data.code === 0) {
            if (res.data.data.length > 0) {
              this.$notify({
                title: '成功',
                type: 'success',
                message: '共搜索到' + res.data.data.length + '个商品',
                offset: 10,
                duration: 2000
              })
              this.products = res.data.data
              this.productName = ''
            } else {
              this.$notify({
                title: '失败',
                type: 'error',
                message: '没有找到合适的商品,请检查商品名',
                offset: 200
              })
              this.prodName = ''
            }
          } else {
            this.$message({
              showClose: close,
              message: 查询失败,
              type: "error"
            })
          }
        })
      },
      // 获取所有商品类
      getAllBusiness() {
        let productsPar = {
          type: 'all'
        }
        adminApi.getAllBusiness(productsPar).then(res => {
          // console.log(res)
          const Oproducts = res.data
          this.businessProducts = res.data
          for (let i = 0; i < Oproducts.length; i++) {
            this.businessFilter.push({
              text: Oproducts[i].businessName,
              value: Oproducts[i].id
            })
          }
          // console.log(this.productsFilter)
        })
      },
      // 获取所有商品
      getallprods() {
        let allprospar = {
          type: 'all'
        }
        adminApi.getAllProducts(allprospar).then(res => {
          // console.log(res)
          this.products = res.data.data
        })
      },
      // 通过商品类型过滤显示商品
      filterType(value, row) {
        // console.log('value', value)
        // console.log('row', row)
        return row.businessId === value
      },
      // 编辑商品
      EditProd(row, rowIndex) {
        this.editprod = rowIndex
        this.imageUrl = rowIndex.imageUrl
        this.dialogFormVisible = true
        // console.log(this.imageUrl)
      },

      //删除商品
      deleteProd(row, rowIndex) {
        adminApi.deleteProduct(rowIndex.id).then(
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
                message: '删除失败',
                offset: 200
              })
            }
          })

      },

      // 退出编辑商品
      exitEdit() {
        this.imageUrl = ''
        this.dialogFormVisible = false
      },


      // mavoneditor图片上传并替换地址
      // 绑定@imgAdd event
      $imgAdd(pos, $file) {
        // 第一步.将图片上传到服务器.
        let formdata = new FormData()
        formdata.append('file', $file)
        adminApi.unloadFile(formdata)
          .then(url => {
            // console.log(url)
            console.log(this.addprod.info)
            // 第二步.将返回的url替换到文本原位置![...](./0) -> ![...](url)
            this.$refs.md.$img2Url(pos, url.data)
          })
      },
      $imgDel(pos) {
        delete this.img_file[pos]
      },
      // 获取商品主图上传成功后返回的图片
      handleSuccess(res, file) {

        this.imageUrl = res
        var index = res.lastIndexOf('/')
        this.editprod.imageUrl = res;
        this.editprod.imageName = res.substring(index + 1);
        //URL.createObjectURL(file.raw)
      },
      // 商品主图再上传前对文件进行判断
      beforeUpload(file) {
        const isPIC = file.type === 'image/jpeg' || 'image/png'
        const isLt5M = file.size / 1024 / 1024 < 5

        if (!isPIC) {
          this.$message.error('上传图片只能是 JPG或PNG 格式!')
        }
        if (!isLt5M) {
          this.$message.error('上传图片大小不能超过 5MB!')
        }
        return isPIC && isLt5M
      },

      // 确认修改并提交
      submitEdit() {
        this.$refs.editprod.validate(valid => {
          if (valid) {
            const updatedParams = {
              id: this.editprod.id,
              productName: this.editprod.productName,
              price: this.editprod.price,
              imageName: this.editprod.imageName,
              category: this.editprod.category,
              businessId: this.editprod.businessId,
              selling: this.editprod.selling ? 1 : 0,
              productDesc: this.editprod.productDesc,
              searchIndex: this.editprod.searchIndex,
              quantity: this.editprod.quantity,
              createTime: this.editprod.createTime,
              sellNum: this.editprod.sellNum
            }
            console.log(updatedParams)
            adminApi.updateProduct(updatedParams).then(res => {
              this.$notify({
                title: '商品修改成功',
                message: res.data.name,
                type: 'success',
                offset: 100
              })
              this.dialogFormVisible = false
              this.getallprods()
            })
            this.imageUrl = ''
          } else {
            this.$message({
              type: 'danger',
              message: '请验证后再提交修改'
            })
          }
        })
      }
    },
    mounted() {
      // ..
      this.getAllBusiness()
      this.getallprods()
    }
    // ,
    // created () {
    //   this.getAllBusiness()
    //   this.getallprods()
    // }
    // ,
    // created: function () {
    //   // 主页添加键盘事件,注意,不能直接在焦点事件上添加回车
    //   var lett = this;
    //   document.onkeydown = function (e) {
    //     var key = window.event.keyCode;
    //     if (key == 13) {
    //       lett.SerchProd();
    //     }
    //   }
    // }
  }

</script>
<style lang="less" scoped>
  @import '../../../assets/css/index.less';
  .section {
    .serchprod {
      .learncontent;
      .serch-input {
        width: 600px
      }
      .serch-btn {
        position: relative;
        width: 100px;
      }
    }
    .allprod {
      .learncontent;
      .table-image {
        width: 100px;
        height: 100px;
        border-radius: 50px;
      }
    }
    .el-form {
      text-align: left;
      .el-select {
        width: 100%;
      }
      .el-switch {
        margin: 10px 0 0 0;
      }
      .prod-image {
        width: 200px;
        height: 200px;
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        .cur-image {
          width: 100%;
        }
        .prod-uploader-icon {
          font-size: 45px;
          color: #8c939d;
          width: 200px;
          height: 200px;
          line-height: 200px;
          text-align: center;
        }
      }
    }
  }

</style>
