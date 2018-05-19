<template>
  <div class="section">
    <Topbar></Topbar>
    <!-- 网站基本设置 -->
    <div class="box">
      <div class="title">
        <h4 class='h'> 所有新闻动态</h4>
        <el-button type="primary" @click="addNews" class='bt'> 添加新闻</el-button>
      </div>
      <el-table :data="news" align=center>
        <el-table-column min-width="20%" prop="publishTime" label="日期">
        </el-table-column>
        <el-table-column min-width="20%" prop="title" label="新闻标题">
        </el-table-column>
        <el-table-column min-width="20%" prop="imageUrl" label="图片">
          <template slot-scope="scope">
            <img class="table-img" :src="scope.row.imageUrl" alt="">
          </template>
        </el-table-column>

        <el-table-column prop="category" label="新闻类别" min-width="20%" :filters="categoryFilter" :filter-method="filterType" filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag close-transition>{{scope.row.category}}</el-tag>
          </template>
        </el-table-column>

        <el-table-column min-width="20%" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="EditNews(scope.$index, scope.row)">修改</el-button>
            <el-button type="danger" @click="deleteNews(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 修改新闻 -->
      <el-dialog title="修改新闻" :visible.sync="dialogFormVisible" width="90%">
        <el-form ref="editnews" label-position="top" :rules="addnewsRules" :model="editnews">
          <el-form-item label="新闻标题" prop="title">
            <el-input v-model="editnews.title" placeholder="请输入标题"></el-input>
          </el-form-item> 
          <el-form-item label="标题图片">
            <el-upload class="img" :action="uploadProductImage" :show-file-list="false" :on-success="handleSuccess" :before-upload="beforeUpload">
              <img v-if="editnews.imageUrl" :src="editnews.imageUrl" class="cur-image">
              <i v-else class="el-icon-plus uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="作者" prop="author">
            <el-input v-model="editnews.author" placeholder="请输入作者"></el-input>
          </el-form-item>

          <el-form-item label="新闻类型" prop="type">
            <el-input v-model="editnews.type" placeholder="如IT类"></el-input>
          </el-form-item>

          <el-form-item label="新闻类别" prop="category">
            <el-select v-model="editnews.category" placeholder="请选择">
              <el-option v-for="item in categorys" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="新闻内容" prop="content">
            <mavon-editor ref="md" @imgAdd="$imgAdd" @imgDel="$imgDel" v-model="editnews.content"></mavon-editor>
            <!--<md-upload :key="editnews.content" :info="editnews.info" ref="mdedit"></md-upload>-->
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="exitEdit">取 消</el-button>
          <el-button type="primary" @click="submitEdit">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import adminApi from '../../../api/adminApi'
  import Topbar from "../../home/topbar"

  import {
    parseStrToDate
  } from '../../../assets/js/assist.js'
  // import {UploadFile} from '../../../api/api'
  export default {
    data() {
      return {
        news: [],
        editnews: {},
        categoryFilter: [{
            value: "公司新闻",
            text: "公司新闻"
          },
          {
            value: "专题报道",
            text: "专题报道"

          }, {
            value: "媒体报道",
            text: "媒体报道"
          }, {
            value: "动态通知",
            text: "动态通知"
          }
        ],

        categorys: [{
            value: "公司新闻",
            label: "公司新闻"
          },
          {
            value: "专题报道",
            label: "专题报道"

          }, {
            value: "媒体报道",
            label: "媒体报道"
          }, {
            value: "动态通知",
            label: "动态通知"
          }
        ],

        imageUrl: '',
        imageName: '',
        dialogFormVisible: false,
        addnewsRules: {
          title: [{
              required: true,
              message: '请添加新闻标题',
              trigger: 'blur'
            },
            {
              min: 8,
              max: 30,
              message: '长度在 8 到 30 个字',
              trigger: 'blur'
            }
          ]
        }
      }
    },
    components: {
      Topbar
    },
    methods: {

      filterType(value, row) {
        return row.category === value
      },

      addNews() {
        this.$router.push({
          path: '/addNews'
        })
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
            console.log(this.editnews.content)
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
        this.imageName = res.substring(index + 1);
        this.editnews.imageUrl = res
        this.editnews.titleImage = this.imageName
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

      //删除商品
      deleteNews(row, rowIndex) {
        adminApi.deleteNews(rowIndex.id).then(
          res => {
            if (res.data.code === 0) {
              let index = -1;
              for (let i = 0; i < this.news.length; i++) {
                if (this.news[i].id === rowIndex.id) {
                  index = i;
                }
              }
              if (index != -1) {
                this.news.splice(index, 1)
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

      allnews() {
        adminApi.getNews().then(res => {
          console.log(res)
          this.news = res.data.data
        })
      },
      EditNews(row, rowIndex) {
        this.dialogFormVisible = true
        this.editnews = rowIndex
        this.imageUrl = rowIndex.imageUrl
      },
      // 退出修改
      exitEdit() {
        this.dialogFormVisible = false
      },
      // 确认修改并提交
      submitEdit() {
        this.$refs.editnews.validate(valid => {
          if (valid) {
            const updatedParams = {
              id: this.editnews.id,
              type: this.editnews.type,
              category: this.editnews.category,
              title: this.editnews.title,
              titleImage: this.editnews.titleImage,
              author: this.editnews.author,
              content: this.editnews.content,
              publishTime: parseStrToDate(this.editnews.publishTime, 'yyyy-MM-dd HH:mm:ss').getTime()
            }
            adminApi.updateNews(updatedParams).then(res => {
              if (res.data.code === 0) {
                this.$notify({
                  title: '修改成功',
                  message: res.data.msg,
                  type: 'success',
                  offset: 100
                })
                this.allnews()
                this.dialogFormVisible = false
              } else {
                this.$notify({
                  title: '修改失败',
                  message: res.data.msg,
                  type: 'error',
                  offset: 100
                })
              }
            })
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
      this.allnews()
    },
    computed: {
      uploadProductImage() {
        let accessToken = sessionStorage.getItem('accessToken')
        return 'http://localhost:8090/xyj/api/attachment/uploadFile?type=news' + "&accessToken=" + accessToken
      }
    }

  }

</script>

<style lang="less" scoped>
  @import '../../../assets/css/init.css';
  @import '../../../assets/css/index.less';
  .section {
    .box {
      .title {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        .h {
          margin-left: 500px;
          font-size: 25px; // flex-basis: 300px
        }

        .bt {
          margin-right: 200px
        }
      }
      .learncontent;
      .el-table {
        .table-img {
          width: 120px;
        }
      }
      .el-dialog {
        .img {
          width: 400px;
          height: 400px;
          border: 1px dashed #d9d9d9;
          border-radius: 6px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          .cur-image {
            width: 100%;
          }
          .uploader-icon {
            font-size: 45px;
            color: #8c939d;
            width: 400px;
            height: 200px;
            line-height: 200px;
            text-align: center;
          }
        }
      }
    }
  }

</style>
