<template> 
  <item-detail :is-edit='true'></item-detail>
</template>
<script>
  import ItemDetail from './components/ItemDetail'
  export default {
    name: 'updateItem',
    components: { ItemDetail }
  }
</script>

<style>
</style>
