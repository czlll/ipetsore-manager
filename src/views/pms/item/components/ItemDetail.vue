<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="edit_item"
             :rules="rules"
             ref="productFrom"
             label-width="150px">
      <div style="overflow: hidden;">
      <template style="float: left;">
      <el-form-item label="所属分类：" prop="selectedParent">
        <div class="block">
          <el-cascader
            v-model="selectedParent"
            :options="muiltCateList"
            :props="{ expandTrigger: 'hover' }"
            @change="handleSelectParent"></el-cascader>
        </div>
      </el-form-item>

      <el-form-item label="listPrice：" prop="listPrice">
        <el-input-number v-model="edit_item.listPrice" :precision="1" :step="0.1" :min="0"></el-input-number>
      </el-form-item>
      <el-form-item label="unitCost：" prop="unitCost">
         <el-input-number v-model="edit_item.unitCost" :precision="1" :step="0.1" :min="0"></el-input-number>
      </el-form-item>
      <el-form-item label="supplierId：" prop="supplierId">
        <el-input v-model="edit_item.supplierId"></el-input>
      </el-form-item>

      <el-form-item label="quantity：" prop="quantity">
        <el-input-number v-model="edit_item.quantity" :min="0"></el-input-number>
      </el-form-item>
      </template>

<!--     <template v-if="isSelected" style="float: left;">
        <el-card :body-style="{ padding: '10px'}" class="product-card">
          <div style="overflow: hidden;">
            <img :src="selectedParent[1].imgUrl" class="image">
          <div style="padding: 20px; float: left;width: 258px;">
            <p class="i-p"><span style="margin-right: 17px;">CategoryId: </span>{{selectedParent[1].categoryId}}</p>
            <p class="i-p"><span style="margin-right: 31px;">ProductId:</span>{{selectedParent[1].productId}}</p>
            <p class="i-p"><span style="margin-right: 57px;">Name:</span>{{ selectedParent[1].name}}</p>
          </div>
          </div>
        </el-card>
      </template> -->

      </div>
      <el-form-item label="attribute1：">
        <el-input type="textarea" :autosize="true" v-model="edit_item.attribute1"></el-input>
      </el-form-item>
      <el-form-item label="attribute2：">
        <el-input type="textarea" :autosize="true" v-model="edit_item.attribute1"></el-input>
      </el-form-item>
      <el-form-item label="attribute3：">
        <el-input type="textarea" :autosize="true" v-model="edit_item.attribute1"></el-input>
      </el-form-item>
      <el-form-item label="attribute4：">
        <el-input type="textarea" :autosize="true" v-model="edit_item.attribute1"></el-input>
      </el-form-item>
      <el-form-item label="attribute5：">
        <el-input type="textarea" :autosize="true" v-model="edit_item.attribute1"></el-input>
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
  import {addItem,getProducts} from '@/api/product'

  const defaultItem = {
    product:{
      productId:'',
      name:'',
      categoryId:'',
      imgUrl:null,
      description: ''
    },
    productId:'',
    listPrice:0,
    unitCost:0,
    supplierId:0,
    status: '',
    quantity:'',
    attribute1:'',
    attribute2:'',
    attribute3:'',
    attribute4:'',
    attribute5:''
  }

  export default {
    name: "itemDetail",
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        edit_item: Object.assign({}, defaultItem),
        cateList: categoryList,
        selectedParent:[],
        isSelected: false,
        muiltCateList:[],   //[{categoryId,prductList},...]
        imgFileList:[],
        dialogVisible: false,
        dialogImageUrl: '',
        enabledUploadBtn: true,
        rules: {
          // selectedParent:[{required: true,message: '请选择所属分类', trigger:'blur'}],
          listPrice: [{required: true, message: '请输入售价', trigger: 'blur'}],
          unitCost:[{required: true, message: '请输入原价', trigger: 'blur'}],
          quantity:[{required: true, message: '请输入库存', trigger: 'blur'}]
        }
      }
    },
    created(){
      this.getMuiltCateList();
      if(this.isEdit){
        this.setEditItem();
      }
    },
    methods: {
      getMuiltCateList(){
        this.cateList.forEach(c => {
          var firstLevel = {
            value: '',
            label: '',
            children: []
          };
          firstLevel.value = c.catid;
          firstLevel.label = c.catid;
          var temp_array = [];
          temp_array.push(firstLevel.value)
          getProducts(temp_array).then(response => {
            if(response.data.code == 1){
              var temp_products = response.data.data.content;
              temp_products.forEach(p => {
                var secondLevel = {
                  value: '',
                  label: ''
                };
                secondLevel.value = p;
                secondLevel.label = p.productId;
                firstLevel.children.push(secondLevel);
              });
            }
            else{
              this.$message.warning(response.data.msg);
            }
          }).catch((response) => {
                  console.log(response);
                  this.loading = false
          });
          this.muiltCateList.push(firstLevel);
        })

        console.log(this.muiltCateList);
      },

      setEditItem(){
        // this.edit_item = this.$route.query.edit_product;
        // this.fileList.push({'name':this.edit_product.name,'url':this.edit_product.imgUrl})
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
                updateItem(this.editItem).then(response => {
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
      beforeUpload(file) {
        this.enabledUploadBtn = false;
      },
      handleRemove(file, fileList) {
        this.enabledUploadBtn = true;
        this.edit_product.imgUrl = null;
        console.log(file, fileList);
      },
      handlePreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
        console.log(file);
      },
      handlesuccess(file, fileList){
        this.enabledUploadBtn = false;
        console.log(file)
        this.edit_product.imgUrl = file;
      },
      handdleError(err, file, fileList){
        this.enabledUploadBtn = true;
        alert('上传失败')
      },
      handleSelectParent(){
        console.log(this.selectedParent);
        this.isSelected = true;
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
    width: 200px;
    margin-top: 10px;
    margin-left: 40px;
    /* display: block; */
    float: left;
  }

  .i-p{
    margin-bottom: 20px;
  }
  .product-card{
    width: 270px;
    margin-bottom: 30px;
    float: left;
    margin-right: 30px;
    border-top: 10px solid #C1CFE5;
  }

  .el-input, .el-input-number{
    width: 220px;
    float: left;
  }
  .el-cascader{
    float: left;
  }
  .el-textarea {
      position: relative;
      display: inline-block;
      width: 100% !important;
      vertical-align: bottom;
      font-size: 14px;
      float: left !important;
/*      min-height: 60px !important; */
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
