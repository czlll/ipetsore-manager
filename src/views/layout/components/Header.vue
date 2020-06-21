<template>
  <el-menu
    :default-active="activeIndex2"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#EEEEEE"
    text-color="#000"
    active-text-color="#4376B3"

    >
<!--    <div style="box-sizing:border-box;width:30%;float:left;">
      <h5></h5>
    </div> -->

    <el-menu-item index="1">
      <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.openedE"></hamburger>
    </el-menu-item>

    <el-submenu index="2">
      <template slot="title">我的工作台</template>
      <el-menu-item index="2-1">选项1</el-menu-item>
      <el-menu-item index="2-2">选项2</el-menu-item>
      <el-menu-item index="2-3">选项3</el-menu-item>
      <el-submenu index="2-4">
        <template slot="title">选项4</template>
        <el-menu-item index="2-4-1">选项1</el-menu-item>
        <el-menu-item index="2-4-2">选项2</el-menu-item>
        <el-menu-item index="2-4-3">选项3</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-menu-item index="3">消息中心</el-menu-item>
    <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
    <el-menu-item index="5">处理中心</el-menu-item>
  </el-menu>
</template>

  <script>
    import { mapGetters } from 'vuex'
    // import Breadcrumb from '@/components/Breadcrumb'
    import Hamburger from '@/components/Hamburger'

    export default {
      name:"Header",
      components: {
        // Breadcrumb,
        Hamburger
      },
      data() {
        return {
          activeIndex: '1',
          activeIndex2: '1'
        };
      },
      computed: {
        ...mapGetters([
          'sidebar',
          // 'avatar'
        ])
      },
      methods: {
        handleSelect(key, keyPath) {
          console.log(key, keyPath);
        },
        toggleSideBar() {
          this.$store.dispatch('ToggleSideBar')
        },
      }
    }
  </script>

<style>
</style>
