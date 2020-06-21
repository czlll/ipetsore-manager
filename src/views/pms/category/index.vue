<template>
  <div
  style="width: 770px;height: 50%;display:block;margin-left: 50px;">

  <el-card style="margin-bottom: 30px;height: 70px;padding: 0;">
    <span class="title-span">CATEGORY  LIST</span>
    <el-tooltip class="item" effect="dark" content="添加种类" placement="top-start">
        <el-button class="title-button" size="small" @click="handleAdd">ADD</el-button>
    </el-tooltip>
  </el-card>

  <el-card>
  <el-table ref="CategoryTable"
            :data="categoryList"
            style="padding-left: 20px;">
    <el-table-column
      label="CATEGORYID"
      width="150px"
      >
      <template slot-scope="scope">
        <svg-icon :icon-class="scope.row.catIcon" style="width: 20px;height: 20px;" class="color-main"></svg-icon>
        <span style="margin-left: 10px"  >{{ scope.row.catid }}</span>
      </template>
    </el-table-column>
    
    <el-table-column
      label="NAME"
      width="120px">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <img :src="scope.row.descn"/>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.name }}</el-tag>
          </div>

        </el-popover>
      </template>
    </el-table-column>

    <el-table-column label="OPERATION" width="240px">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="viewProduct(scope.$index, scope.row)">Product</el-button>
        <el-button slot="reference"
          size="mini"
          @click="">Banner</el-button>
      </template>
    </el-table-column>

    <el-table-column label="SETTINGS" width="190px">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button slot="reference"
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </el-card>
  <el-dialog title="编辑种类" :visible.sync="dialogFormVisible">
    <el-form ref="categoryEditForm" :model="editCategory" :rules="rules" >
      <el-form-item label="CATEGORYID" :label-width="formLabelWidth" prop="catid">
        <el-input v-model="editCategory.catid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="NAME" :label-width="formLabelWidth" prop="name">
        <el-input v-model="editCategory.name" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleConfirm('categoryEditForm')">确 定</el-button>
    </div>
  </el-dialog>

  </div>
</template>

<script>
  import categoryList from '@/config/category-config'
  export default {
    data() {
      return {
        categoryList: categoryList,
        dialogFormVisible:false,
        editCategory: {},
        formLabelWidth: '120px',
        rules:{
          name: [
            { required: true, message: '请输入类型名称', trigger: 'blur' }
          ],
          catid:[
            {required: true, message: '请输入类型ID', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      handleEdit(index, row) {
        if(this.dialogFormVisible === false){
          this.dialogFormVisible = true;
          this.editCategory = {
            catid: row.catid,
            name: row.name,
            descn: row.descn
          };

        }

        console.log(index, row);
      },
      handleDelete(index, row) {
        this.$confirm('是否要删除该种类', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.categoryList.splice(index,1);
          this.$message({
            message: '删除成功',
            type: 'success',
            duration:1000
          });
          // this.getList();
        });
        console.log(index, row);
      },
      viewProduct(index, row){
        this.$router.push({path:'/pms/product',query:{categoryId:row.catid}})
      },
      handleAdd(){
        this.dialogFormVisible = true;
      },
      handleConfirm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // let data = new URLSearchParams();
            // data.append("name",this.productAttrCate.name);
            if(this.dialogTitle==="添加类型"){
              var newCate = {
                catid: this.editCategory.catid,
                name: this.editCategory.name,
                descn: this.editCategory.descn
              };
              this.categoryList.push(newCate)
              // this.$set(categoryList,0,newCate);
              //createProductAttrCate(data).then(response=>{
                this.$message({
                  message: '添加成功',
                  type: 'success',
                  duration:1000
                });
                this.dialogFormVisible = false;
                //this.getList();
              //});
            }else{
              // updateProductAttrCate(this.productAttrCate.id,data).then(response=>{
                this.$message({
                  message: '修改成功',
                  type: 'success',
                  duration:1000
                });
                this.dialogFormVisible = false;
               // this.getList();
              // });
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>

<style scoped>
.title-span{
  float: left;
  margin-top: 0;margin-left: 10px;
  padding-top: 5px;
}

.title-button{
  float: right;
  padding-bottom: 8px;
}
</style>
