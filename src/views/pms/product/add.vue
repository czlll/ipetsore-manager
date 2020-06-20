<template> 
  <product-cate-detail :is-edit='false'></product-cate-detail>
</template>
<script>
  import ProductCateDetail from './components/ProductDetail'
  export default {
    name: 'addProductCate',
    components: { ProductCateDetail }
  }
</script>
<style>
</style>
