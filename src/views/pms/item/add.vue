<template> 
  <item-detail :is-edit='false'></item-detail>
</template>
<script>
  import ItemDetail from './components/ItemDetail'
  export default {
    name: 'addProductCate',
    components: { ItemDetail }
  }
</script>
<style>
</style>
