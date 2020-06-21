<template>
  <div style="margin-left: 2em;position: relative;">
    <div class="searchArea">
      <div style="margin-left: 15px;float: left;">
      <el-form :inline="true" class="demo-form-inline">
            <el-select
              v-model="seleteCate"
              multiple
              filterable
              allow-create
              placeholder="Category"
              @change= "doFilter"
              @remove-tag="doFilter"
              >
              <el-option
                v-for="item in cateList"
                :key="item.index"
                :label="item.name"
                :value="item.catid">
              </el-option>
            </el-select>
        <el-form-item>
         <el-input v-model="keyword" placeholder="Search" class="i-search-input" @blur.native.capture="handleSearch">
           <span slot="prefix">
             <svg-icon icon-class="search" style="margin-left: 5px;"></svg-icon>
           </span>
         </el-input>
         </el-form-item>
      </el-form>
      </div>
      <el-tooltip class="item" effect="dark" content="添加种类" placement="top-start">
        <el-button class="i-circle-button" style="float: left;margin-left: 25px;border: none;vertical-align:baseline;" @click="handleAdd" circle>
          <svg-icon icon-class="addBig" style="width: 2em;height: 2em; color: #97BBE6;"></svg-icon>
        </el-button>
      </el-tooltip>
    </div>

     <el-row v-model="productList">
       <el-col :span="7" v-for="p in productList.slice((currentPage-1)*pagesize,currentPage*pagesize)" :key="p.index" :offset="0">
         <el-card :body-style="{ padding: '15px'}" style="width: 210px;height: 310px;margin-bottom: 30px;">
           <div style="overflow: hidden;">
             <img :src="p.imgUrl" class="image">
           </div>

           <div style="padding: 14px;">
             <!-- <el-tag type="info" style=""> {{p.categoryId}}</el-tag> -->
             <el-tooltip effect="dark" :content="p.description" placement="top-start">
               <p>{{p.productId}}</p>
             </el-tooltip>
             <p style="margin-top: 8px;">{{ p.name}}</p>
             <div class="bottom clearfix">
               <el-button type="text" class="button" @click="handleViewItems(p.productId)">Details</el-button>

              <el-tooltip class="item" effect="dark" content="删除" placement="right">
                <el-button class="i-delete-button" style="padding: 0;" @click="handleDelete(p.productId)">
                  <svg-icon icon-class="delete" style="width: 1.3em;height: 1.3em;" ></svg-icon>
                </el-button>
              </el-tooltip>

             </div>
           </div>
         </el-card>
       </el-col>
     </el-row>
     <el-pagination
       @size-change="handleSizeChange"
       @current-change="handleCurrentChange"
       :current-page="currentPage"
       :page-size="pagesize"
       layout="total, prev, pager, next, jumper"
       background
       :total="total"
       style="margin-bottom: 30px;">
     </el-pagination>
  </div>
</template>

<script>
import {getProducts,deleteProduct,getProductDetail} from '@/api/product'
import categoryList from '@/config/category-config'

export default {
  name:'product',
  data() {
    return {
      currentPage:1, //初始页
      pagesize:6,    //每页的数据
      total: 0,
      p_categoryId : 0,

      productList: [],
      p_itemList: [],
      inital_products:[],
      dialogFormVisible:false,
      currentDate: new Date(),
      cateList: categoryList,
      seleteCate: [],
      keyword: '',
    };
  },
  created() {
    this.resetParentId();
    if(this.seleteCate.length > 0)
      this.doFilter();
    else
      this.getList();
  },
  watch: {
    $route(route) {
      this.resetParentId();
      if(this.seleteCate.length > 0)
        this.doFilter();
      else
        this.getList();
    }
  },
  methods:{
	resetParentId(){
    console.log("getid")
	  this.currentPage = 1;
	  if (this.$route.query.categoryId != null) {
	    this.p_categoryId = this.$route.query.categoryId;
      this.seleteCate.push(this.p_categoryId);
	  } else {
	    this.p_categoryId = 0;
      this.seleteCate = []
	  }
	},

	//从后端获取相关的数据：分页查看全部的product列表
	getList() {
    console.log("getlist")
	  this.listLoading = true;
    getProducts(this.seleteCate,this.keyword,this.currentPage,this.pagesize).then(response => {
      console.log(response);
      if(response.data.code == 1){
        if(this.currentPage != 1)
          this.productList.push(...response.data.data.content)
        else{
          this.productList = [];
          this.productList.push(...response.data.data.content)
        }
        console.log(this.productList)
        this.total = response.data.data.totalSize;
      }
      else if(response.data.code == 30001){
        this.$message.error(response.data.msg)
        this.productList.splice(0,this.productList.length);
        console.log(response.data.msg)
      }
      else{
        console.log(response.data.msg)
        this.loading = false;
        return false
      }
    }).catch((response) => {
      console.log(response);
      this.loading = false
    })
	},

    //根据种类筛选
    doFilter(){
      this.currentPage = 1;
      this.getList();
    },

    handleSearch(){
      this.currentPage = 1;
      this.getList();
    },

    handleAdd(){
      this.$router.push({path:'/pms/addProduct'});
    },
    handleDelete(pid){
      getProductDetail(pid).then(response => {
        if(response.data.code == 1){
          this.p_itemList=response.data.data.itemList;
          console.log(this.p_itemList)

          this.$confirm('商城中还有该品种的宠物，继续操作则会将对应的宠物全部删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }).then(() => {
                    this.doDelete(pid);
                  }).catch(() => {
                    this.$message({
                      type: 'info',
                      message: '已取消删除'
                    });
                  });
        }
        else{
          this.$confirm('此操作将永久删除该品种, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }).then(() => {
                    this.doDelete(pid);
                  }).catch(() => {
                    this.$message({
                      type: 'info',
                      message: '已取消删除'
                    });
                  });
          console.log(response.data.msg)
        }
      }).catch((response) => {
        console.log(response);
        this.loading = false
      })


    },
    doDelete(pid){
      deleteProduct(pid).then(response => {
        console.log(response);
        console.log(response.data.code)
        if(response.data.code == 1){
          this.getList();
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }
        else{
          this.$message({
            type: 'warn',
            message: response.data.msg
          });
        }
      }).catch((response) => {
            this.loading = false;
            console.log(response)
         })
    },

    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function (size) {
      this.pagesize = size;
      console.log(this.pagesize)  //每页下拉显示数据
      this.getList();
    },
    handleCurrentChange: function(currentPage){
      this.currentPage = currentPage;
      console.log(this.currentPage)  //点击第几页
      this.getList();
    },

    handleViewItems(pid){
      this.$router.push({path:'/pms/viewProduct',query:{productId:pid}})
    },
    findByIndex(index,list){
      list.forEach(i => {
        if(i.index == index)
          return i;
      });
    }
  }
}
</script>

<style scoped>
  p{
    text-align: left;
  }

  .searchArea{
/*    border-style:solid;
    border-radius: 10px;
    border-color: #DCDFE6;
    border-width: 1px; */
    margin-bottom: 30px;
    width: 78%;
    /* height: 90px; */
    padding: 0;
    overflow: hidden;
  }

    .time {
      font-size: 13px;
      color: #999;
    }

    .bottom {
      margin-top: 13px;
      line-height: 12px;
    }

    .button {
      padding: 0;
      float: left;
    }

    .image {
      width: 163px;
      height: 163px;
      margin: 15px 0 0px 15px;
      /* display: block; */
      /* float: left; */
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }
    .i-search-input{
      /* width: 50%; */
    }
   .i-circle-button{
      background-color: #eeeeee;
    }
   .i-circle-button:hover{
      background-color: #ECF5FF;
    }

    .i-delete-button{
      border: none;
      background-color: #FFFFFF;
      float: right;
      color: #666666;
    }
    .i-delete-button:hover{
      border: none;
      background-color: #FFFFFF;
      float: right;
      color: #91252A;
    }
</style>
