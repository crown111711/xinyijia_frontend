<template>
  <div>
    <el-upload class="img" :action="uploadProductImage" :show-file-list="false" :on-success="handleSuccess" drag multiple>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>
    <!-- 所有商品 -->
    <div class="allprod">
      <h4>所有文件</h4>
      <el-table :data="files" style="width: 100%" align="center">


        <el-table-column prop="createTime" label="文件生成时间" min-width="10%">
        </el-table-column>

        <el-table-column prop="fileName" label="文件名" min-width="20%">
        </el-table-column>

        <el-table-column prop="fileType" label="文件类型" min-width="10%">
        </el-table-column>
        <el-table-column prop="fileSize" label="文件大小" min-width="30%">

        </el-table-column>
        <el-table-column prop="fileDesc" label="文件描述" min-width="10%">
        </el-table-column>
        <el-table-column min-width="20%" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="EditProd(scope.$index, scope.row)">增加文件描述</el-button>
            <el-button type="danger" @click="deleteProd(scope.$index, scope.row)">删除文件</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="编辑商品" :visible.sync="dialogFormVisible" width="90%">
        <el-input v-model="editFile.fileDesc"></el-input>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitEdit">确 定</el-button>
          <el-button @click="exitEdit">取 消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import adminApi from '../../../api/adminApi'
  export default {
    data() {
      return {
        files: [],
        dialogFormVisible: false,
        editFile: {}
      }
    },
    computed: {
      uploadProductImage() {
        let accessToken = sessionStorage.getItem('accessToken')
        return 'http://localhost:8090/xyj/api/attachment/uploadMultipartFile?type=download&category=download' +
          "&accessToken=" + accessToken
      }

    },
    methods: {
      handleSuccess() {
        this.$message({
          showClose: close,
          message: "上传成功",
          type: 'success'
        })
        this.getDownloadFile()
      },
      getDownloadFile() {
        adminApi.getDownFile().then(res => {
          if (res.data.code === 0) {
            this.files = res.data.data
          }
        })

      },
      submitEdit() {
        let params = {
          fileName: this.editFile.fileName,
          fileDesc: this.editFile.fileDesc
        }
        adminApi.updateFile(params).then(res => {
          if (res.data.code === 0) {
            this.$message({
              showClose: close,
              message: "修改成功",
              type: 'success'
            })
          }
          this.getDownloadFile()
        })
        this.dialogFormVisible = false
      },
      deleteProd(index, file) {
        adminApi.deleteFile(file.fileName).then(res => {
          if (res.data.code === 0) {
            this.$message({
              showClose: close,
              message: "删除成功",
              type: 'success'
            })
            this.getDownloadFile()
          }
        })
      },
      EditProd( index, file) {
        this.editFile = file
        this.dialogFormVisible = true
      },
      // 退出编辑
      exitEdit() {
        this.dialogFormVisible = false
      },
    },
    created() {
      this.getDownloadFile();
    }

  }

</script>
