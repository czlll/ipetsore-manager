<template>
  <div>
      <el-table
        :data="itemList"
        stripe
        style="width: 85%">
        <el-table-column
          prop="itemId"
          label="itemId"
          width="180">
        </el-table-column>
        <el-table-column
          prop="listPrice"
          label="listPrice"
          width="180">
        </el-table-column>
        <el-table-column
          prop="unitCost"
          label="unitCost">
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
  </div>
</template>

<script>
  export default {
    name:'item',
    data() {
      return {
        i_product:null,
        itemList :[],

        currentPage:1, //初始页
        pagesize:5,    //每页的数据
        total: 0,
        inital_products:[],
        dialogFormVisible:false,
        currentDate: new Date(),
        seleteCate: [],
        keyword: ''
      };
    },
    created() {
      this.resetProductId();
      this.getList();
    },
    watch: {
      $route(route) {
        this.resetProductId();
        this.getList();
      }
    },
    methods:{
      resetProductId(){
        this.currentPage = 1;
        if (this.$route.query.parentId != null) {
          this.p_categoryId = this.$route.query.parentId;
        } else {
          this.p_categoryId = 0;
        }
      },
      //从后端获取相关的数据
      getList() {
      this.$ajax.get('https://8768142e-3035-439a-a6b2-28553b0e060c.mock.pstmn.io/manager/products/FI-FW-01')
      .then((response)=>{
        console.log(response)
          this.itemList=response.data.data.itemList;
          this.i_product = response.data.data.product;
          console.log(this.itemList)
      }).catch((response)=>{
          console.log(response);
      })
      },

      doFilter(){
        console.log(this.seleteCate)
        if(this.seleteCate.length >0){
        var newProducts = this.inital_products.filter(p =>{
          if (this.seleteCate.indexOf(p.categoryId)>=0)
          	return true
        });
        console.log(newProducts)
        this.productList = [];
        this.productList.push(...newProducts);
        console.log(this.productList)
        }
        else{
          this.showAll();
        }
      },
      removeTag(tag){
        var addList = this.inital_products.filter(p =>{
          if (p.categoryId != tag)
          	return true
        });
        this.productList.push(...addList)
      },
      showAll(){
        this.productList = [];
        this.productList.push(...this.inital_products);
      },
      onSubmit(){

      },
      handleAdd(){
        this.$router.push({path:'/pms/addProduct'});
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

      handleViewItems(pid){
        this.$router.push({path:'/pms/item',query:{productId:pid}})
      }
    }
  }
</script>

<style>
</style>
