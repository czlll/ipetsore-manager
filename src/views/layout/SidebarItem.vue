<template>
  <el-row class="tac">
   <el-col :span="24">
      <el-menu
            class="el-menu-vertical-demo"
            router
            unique-opened
            @open="handleOpen"
            @close="handleClose"
            background-color="#C1CFE5"
            text-color="#fff"
            active-text-color="#4376B3"
            style="height: 720px;">
        <el-menu-item >
          <span slot="title">HOME</span>
        </el-menu-item>

        <el-submenu v-for="item in menu" :index="item.name" :key="item.id">
          <template slot="title">
            <i class="el-icon-s-goods"></i>
            <span v-text="item.name"></span>
          </template>
          <el-menu-item-group
            class="over-hide"
            v-for="sub in item.sub"
            :key="sub.componentName">
            <el-menu-item :index="sub.name" v-text="sub.componentName">

            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-menu-item index="3" disabled>
          <i class="el-icon-document"></i>
          <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
  import menu from '@/config/menu-config'
  export default {
    data(){
      return {
        menu: menu
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath)
      }
    }
  }
</script>

<style>

</style>
