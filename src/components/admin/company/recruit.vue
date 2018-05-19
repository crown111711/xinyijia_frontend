<template>
  <div class="section">
    <!-- 网站基本设置 -->
    <div class="box">
      <h4>招聘</h4>
      <el-form ref="addnews" label-position="top" :rules="addnewsRules" :model="addnews">
        <el-form-item label="招聘标题" prop="title">
          <el-input v-model="addnews.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="招聘标题图片">
          <el-upload class="img" :action="uploadProductImage" :show-file-list="false" :on-success="handleSuccess" :before-upload="beforeUpload">
            <img v-if="addnews.imageUrl" :src="addnews.imageUrl" class="cur-image">
            <i v-else class="el-icon-plus uploader-icon"></i>
          </el-upload>
          <!--<qiniu-upload width="300" height="200" fontSize="50" ref="newsupload"></qiniu-upload>-->
        </el-form-item>

        <el-form-item label="作者" prop="author">
          <el-input v-model="addnews.author" placeholder="请输入作者"></el-input>
        </el-form-item>

        <!--<el-form-item label="新闻类型" prop="type">
          <el-input v-model="addnews.type" placeholder="如IT类"></el-input>
        </el-form-item>-->

        <!--<el-form-item label="新闻类别" prop="category">
          <el-select v-model="addnews.category" placeholder="请选择">
            <el-option v-for="item in categorys" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>-->

        <el-form-item label="招聘内容" prop="content">
          <mavon-editor ref="md" @imgAdd="$imgAdd" @imgDel="$imgDel" v-model="addnews.content"></mavon-editor>

          <!--<mavon-editor class="md"  :subfield="prop.subfield" :default_open="prop.default_open" :toolbarsFlag="prop.toolbarsFlag"
            :editable="prop.editable" :scrollStyle="prop.scrollStyle"></mavon-editor>-->
          <!--<md-upload ref="newmd"></md-upload>-->

        </el-form-item>
        <el-form-item>
          <el-button type="danger" round @click="AddNews">确认添加</el-button>
          <el-button type="primary" round @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  // import {UploadFile} from '../../../api/api'
  import adminApi from '../../../api/adminApi'
   import {
    parseStrToDate
  } from '../../../assets/js/assist.js'
  export default {
    data() {
      return {

        imageUrl: '',
        imageName: '',

        addnews: {
          id: '',
          type: '',
          titleImage: '',
          content: '',
          author: '',
          title: '',
          category: 'about',
          publicTime: ''
        },
        prop: {
          editable: false,
          toolbarsFlag: false,
          subfield: false,
          default_open: "preview",
          scrollStyle: true
        },

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

        img: '',
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
          ],
          category: [{
            required: true,
            message: '请选择类别',
            trigger: 'blur'
          }]
        }
      }
    },

    created() {
      adminApi.getAbout('recruit').then(res => {
        if (res.data.code === 0) {
          this.addnews = res.data.data
        }
      })
    },

    computed: {
      uploadProductImage() {
        let accessToken = sessionStorage.getItem('accessToken')
        return 'http://localhost:8090/xyj/api/attachment/uploadFile?type=news' + "&accessToken=" + accessToken
      }

    },

    methods: {


      // mavoneditor图片上传并替换地址
      // 绑定@imgAdd event
      $imgAdd(pos, $file) {
        // 第一步.将图片上传到服务器.
        let formdata = new FormData()
        formdata.append('file', $file)
        adminApi.unloadFile(formdata)
          .then(url => {
            // console.log(url)
            console.log(this.addnews.content)
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
        this.addnews.imageUrl = res
        var index = res.lastIndexOf('/')
        this.imageName = res.substring(index + 1);
        this.addnews.titleImage = this.imageName
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

      AddNews() {
        this.$refs.addnews.validate(valid => {
          if (valid) {

            if (this.addnews.id == null) {

              let par = {
                title: this.addnews.title,
                type: this.addnews.type,
                titleImage: this.addnews.titleImage,
                content: this.addnews.content,
                author: this.addnews.author,
                category: this.addnews.category
              }
              adminApi.addNews(par).then(res => {
                console.log(res)
                this.$notify({
                  title: '成功！',
                  type: 'success',
                //   message: res.data.msg,
                  offset: 200
                })
                //this.$router.push('/allNews')
              })
            } else {

              const updatedParams = {
                id: this.addnews.id,
                type: this.addnews.type,
                category: this.addnews.category,
                title: this.addnews.title,
                titleImage: this.addnews.titleImage,
                author: this.addnews.author,
                content: this.addnews.content,
                publishTime: parseStrToDate(this.addnews.publishTime, 'yyyy-MM-dd HH:mm:ss').getTime()
              }
              adminApi.updateNews(updatedParams).then(res => {
                if (res.data.code === 0) {
                  this.$notify({
                    title: '修改成功',
                    // message: res.data.msg,
                    type: 'success',
                    offset: 100
                  })
                  this.allnews()
                  this.dialogFormVisible = false
                } else {
                  this.$notify({
                    title: '修改失败',
                    // message: res.data.msg,
                    type: 'error',
                    offset: 100
                  })
                }
              })

            }

          } else {
            console.log('需验证')
          }
        })
      },
      reset() {
        this.$refs.addnews.resetFields()
      }
    }
  }

</script>
<style lang="less" scoped>
  @import '../../../assets/css/init.css';
  @import '../../../assets/css/index.less';
  .section {
    .box {
      text-align: left;
      .learncontent;
      h4 {
        text-align: center;
      }
      .img {
        width: 400px;
        height: 200px;
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

</style>
