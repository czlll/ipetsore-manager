<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="product"
             :rules="rules"
             ref="productFrom"
             label-width="150px">
      <el-form-item label="品种名称：" prop="name">
        <el-input v-model="product.name"></el-input>
      </el-form-item>
      <el-form-item label="所属分类：">
        <el-select v-model="product.categoryId"
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
        <single-upload v-model="product.imgUrl"></single-upload>
      </el-form-item>

      <el-form-item label="分类描述：">
        <el-input type="textarea" :autosize="true" v-model="productCate.description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('productFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('productFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  import categoryList from '@/config/category-config'
  import SingleUpload from '@/components/Upload/singleUpload';

  const defaultProductCate = {
    description: '',
    icon: '',
    keywords: '',
    name: '',
    navStatus: 0,
    parentId: 0,
    productUnit: '',
    showStatus: 0,
    sort: 0,
    productAttributeIdList: []
  };
  export default {
    name: "ItemDetail",
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        // productFrom:{}
        product: {},
        cateList : categoryList,
        productCate: Object.assign({}, defaultProductCate),
        selectProductCateList: [],
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
    created() {
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {

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
        this.$refs[formName].resetFields();
        this.productCate = Object.assign({}, defaultProductCate);
        // this.getSelectProductCateList();
        this.filterProductAttrList = [{
          value: []
        }];
      },
      // handleAvatarSuccess(res, file) {
      //   this.imageUrl = URL.createObjectURL(file.raw);
      // },
      // beforeAvatarUpload(file) {
      //   const isJPG = file.type === 'image/jpeg';
      //   const isLt2M = file.size / 1024 / 1024 < 2;

      //   if (!isJPG) {
      //     this.$message.error('上传头像图片只能是 JPG 格式!');
      //   }
      //   if (!isLt2M) {
      //     this.$message.error('上传头像图片大小不能超过 2MB!');
      //   }
      //   return isJPG && isLt2M;
      // }
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

  .el-input{
    width: 220px;
    float: left;
  }
  .el-textarea {
      position: relative;
      display: inline-block;
      width: 80% !important;
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

  .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
</style>
