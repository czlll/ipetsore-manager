<template>
  <div style="margin-left: 2em;position: relative;">
    <el-card :body-style="{ padding: '10px'}" class="product-card">
      <div style="overflow: hidden;">
        <img :src="i_product.imgUrl" class="image">
      <div style="padding: 20px; float: left;width: 258px;">
        <p class="i-p"><span style="margin-right: 17px;">CategoryId: </span>{{i_product.categoryId}}</p>
        <!-- <el-tag type="info" > </el-tag> -->
        <p class="i-p"><span style="margin-right: 31px;">ProductId:</span>{{i_product.productId}}</p>
        <p class="i-p"><span style="margin-right: 57px;">Name:</span>{{ i_product.name}}</p>
        <div style="overflow: hidden;">
          <el-button type="primary" icon="el-icon-edit" circle style="float: right;margin-top: 8px;" @click="handleUpdateProduct"></el-button>
          <el-button type="success" circle style="float: right;margin-right: 20px;margin-top: 8px;" @click="handleAddItem">
            <svg-icon icon-class="Add" ></svg-icon>
          </el-button>
        </div>
      </div>
      </div>
    </el-card>
    <div>
      <h1>Item List</h1>
    <el-table
      ref="filterTable"
      :data="itemList"
      stripe
      style="width: 65%;margin-bottom: 30px;">
      <el-table-column
        prop="itemId"
        label="itemId"
        column-key="itemId"
        sortable
        width="150">
      </el-table-column>
      <el-table-column
        prop="listPrice"
        label="listPrice"
        sortable
        width="150">
      </el-table-column>
      <el-table-column
        prop="unitCost"
        label="unitCost"
        sortable>
      </el-table-column>
      <el-table-column
        prop="supplierId"
        label="supplierId">
      </el-table-column>
      <el-table-column
        prop="status"
        label="status">
      </el-table-column>
    </el-table>

     <el-pagination
       @size-change="handleSizeChange"
       @current-change="handleCurrentChange"
       :current-page="currentPage"
       :page-size="pagesize"
       layout="total, prev, pager, next, jumper"
       background
       :total="itemList.length"
       style="margin-bottom: 30px;">
     </el-pagination>
     </div>
  </div>
</template>

<script>
import {getProductDetail} from '@/api/product'

export default {
  name:'viewProduct',
  data() {
    return {
      currentPage:1, //初始页
      pagesize:5,    //每页的数据
      total: 0,
      i_product:{},

      listLoading: true,
      itemList: [],
      // productList: [],
      inital_products:[],
      dialogFormVisible:false,
      currentDate: new Date(),
      keyword: ''
    };
  },
  created() {
    this.resetParentId();
    this.getList();
  },
  watch: {
    $route(route) {
      this.resetParentId();
      this.getList();
    }
  },
  methods:{
    resetParentId(){
      this.currentPage = 1;
      if (this.$route.query.productId != null) {
        this.i_product.productId = this.$route.query.productId;
      } else {
        this.i_product.productId = 0;
      }
    },
    //从后端获取相关的数据
    getList() {
      getProductDetail(this.i_product.productId).then(response => {
        console.log(response);
        if(response.data.code == 1){
          this.itemList=response.data.data.itemList;
          this.i_product = response.data.data.product;
          console.log(this.itemList)
        }
        else{
          console.log(response.data.msg)
        }
      }).catch((response) => {
        console.log(response);
        this.loading = false
      })
    },
    handleViewItems(pid){
      this.$router.push({path:'/pms/item',query:{productId:pid}})
    },
    handleAddItem(){
      this.$router.push({path:'/pms/addItem'});
    },
    handleUpdateProduct(){
      this.$router.push({path:'/pms/updateProduct',query:{edit_product: this.i_product}});
    },
    // 初始页currentPage、初始每页数据数pagesize和数据data
            handleSizeChange: function (size) {
                    this.pagesize = size;
            console.log(this.pagesize)  //每页下拉显示数据
            },
            handleCurrentChange: function(currentPage){
                    this.currentPage = currentPage;
                    console.log(this.currentPage)  //点击第几页
            },
  }
}
</script>

<style scoped>
  p{
    text-align: left;
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
      float: right;
    }

    .image {
      width: 200px;
      margin-top: 10px;
      margin-left: 40px;
      /* display: block; */
      float: left;
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
</style>
