<template>
  <div id="home">
    home
    首页
  </div>
</template>

<script>
export default {
  // name: 'home',
  // components:{
  //   'navmenu': NavMenu,
  //   'vheader': Header,
  //   'sidebar': Sidebar
  // }
}
</script>

<style>
li{
  overflow: hidden;
  /* display:inline-block; */
}
span{
  overflow: hidden;
  /* display:inline-block; */
}
    .el-aside {
      /* background-color: #E9EEF3; */
      color: #333;
      text-align: center;
      line-height: 160px;
      position: fixed;
      float: left;
      overflow: hidden;
      /* margin-top: 60px; */
    }

  .el-header, .el-footer {
     /* background-color: #EEEEEE; */
      color: #333;
      text-align: center;
      line-height: 60px;
      padding: 0;
      margin-left: 200px;
      width: 100%;
      overflow-y:auto;
      z-index: 1;
      float: left;
    }

    .el-footer{
      border-top-style:solid;
      border-top-color: #DCDFE6;
      border-top-width: 1px;
    }
    .el-main {
      /* background-color: #EEEEEE; */
      color: #333;
      text-align: center;
      padding: 5px;
      padding-top: 60px;
      padding-left: 200px;
      float: left;
      width: 100%;
    }

    body > .el-container {
      margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
      line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
      line-height: 320px;
    }

    body{
      /* background-color: #F4F4F4; */
      background-color: #EEEEEE;
    }
</style>
