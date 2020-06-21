<template> 
  <product-cate-detail :is-edit='true'></product-cate-detail>
</template>
<script>
  import ProductCateDetail from './components/ProductDetail'
  export default {
    name: 'updateProductCate',
    components: { ProductCateDetail }
  }
</script>
<style>
</style>
