<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="edit_product"
             :rules="rules"
             ref="productFrom"
             label-width="150px">
      <el-form-item label="品种名称：" prop="name">
        <el-input v-model="edit_product.name"></el-input>
      </el-form-item>
      <el-form-item label="所属分类：">
        <el-select v-model="edit_product.categoryId"
                   placeholder="请选择分类">
          <el-option
            v-for="item in cateList"
            :key="item.index"
            :label="item.name"
            :value="item.catid">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Image：">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="handlesuccess"
          :on-error="handdleError"
          :file-list="fileList"
          list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <!-- <single-upload v-model="edit_product.imageUrl"></single-upload> -->
      </el-form-item>

      <el-form-item label="分类描述：">
        <el-input type="textarea" :autosize="true" v-model="edit_product.description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('productFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('productFrom')">重置</el-button>
      </el-form-item>
    </el-form>

    <el-dialog :visible.sync="dialogVisible" width="30%">
      <img width="100%" class="image" :src="dialogImageUrl" alt="">
    </el-dialog>
  </el-card>
</template>

<script>
  import categoryList from '@/config/category-config'
  import {addProduct,updateProduct} from '@/api/product'
  // import SingleUpload from '@/components/Upload/singleUpload';

  const defaultProduct = {
    name:'',
    categoryId:'',
    imgUrl:'',
    description: ''
  }

  export default {
    name: "updateProduct",
    props: {
      isEdit: {
        type: Boolean,
        default: true
      }
    },
    components:{
      // SingleUpload
    },
    data() {
      return {
        edit_product: Object.assign({}, defaultProduct),
        cateList: categoryList,
        fileList:[],
        dialogVisible: false,
        dialogImageUrl: '',
        rules: {
          name: [
            {required: true, message: '请输入品种名', trigger: 'blur'},
            {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
          ],
          categoryId:[
            {require:true, message:'请选择所属分类'}
          ]
        }
      }
    },
    created(){
      if(this.isEdit){
        this.setEditProduct();
      }
    },
    methods: {
      setEditProduct(){
        this.edit_product = this.$route.query.edit_product;
        this.fileList.push({'name':this.edit_product.name,'url':this.edit_product.imgUrl})
      },
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if(this.isEdit){
                updateProduct(this.edit_product).then(response => {
                  console.log(response);
                  if(response.data.code == 1){
                    this.$message({
                      message: '修改成功',
                      type: 'success',
                      duration:2000
                    });
                  }
                  else{
                    this.$message({
                      message: response.data.msg,
                      type: 'warn',
                      duration:2000
                    });
                  }

                }).catch((response) => {
                  console.log(response);
                  this.loading = false
                })
              }
              else{
                addProduct(this.edit_product).then(response => {
                  console.log(response);
                  if(response.data.code == 1){
                    this.$message({
                      message: '添加成功',
                      type: 'success',
                      duration:2000
                    });
                  }
                  else{
                    this.$message({
                      message: response.data.msg,
                      type: 'warn',
                      duration:2000
                    });
                  }
                
                }).catch((response) => {
                  console.log(response);
                  this.loading = false
                })
              }
            });

          } else {
            this.$message({
              message: '验证失败',
              type: 'error',
              duration: 1000
            });
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$confirm('是否清空数据', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$refs[formName].resetFields();
          this.edit_product = Object.assign({}, defaultProduct);
          this.fileList = [];
        });
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
        console.log(file);
      },
      handlesuccess(response, file, fileList){
        this.edit_product.imgUrl = file;
      },
      handdleError(err, file, fileList){
        alert('上传失败')
      }
  },
  }
</script>

<style scoped>
  .form-container{
    border-style:solid;
    border-radius: 10px;
    border-color: #DCDFE6;
    border-width: 1px;
    background-color: #eeeeee;
    width: 85%;
    margin-left: 50px;
  }

  .image {
    width: 100%;
    margin-left: 15px;
    /* display: block; */
    /* float: left; */
  }

  .el-input{
    width: 220px;
    float: left;
  }
  .el-textarea {
      position: relative;
      display: inline-block;
      width: 100% !important;
      vertical-align: bottom;
      font-size: 14px;
      float: left !important;
      min-height: 60px !important;
  }
  .el-radio-group{
    float: left;
    padding-top: 12px;
  }
  .el-select{
    float: left;
  }
  .el-form{
    width: 70%;
  }
</style>
