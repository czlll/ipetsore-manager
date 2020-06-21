<template>
  <el-scrollbar>
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <sidebar-item :routes="routes"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
  import { mapGetters } from 'vuex'
  import SidebarItem from './SidebarItem'
  // import ScrollBar from '@/components/ScrollBar'

  export default {
    name:"sidebar",
    components: { 'sidebar-item': SidebarItem },
    computed: {
      ...mapGetters([
        'routers',
        'sidebar'
      ]),
      routes() {
        // return this.$router.options.routes
        return this.routers
      },
      isCollapse() {
        return !this.sidebar.opened
      }
    }
  }
</script>

<style>
</style>
