<template>
  <div id="app">
    <transition name="animated fadeOutLeft">
    <!-- <transition :name="transitionName"> -->
      <router-view/>
    </transition>

  </div>
</template>

<script>
export default {
  name: 'App',
  data(){

    return {
    	transitionName: 'slide-left'
    }
  },
  watch: {
  	'$route' (to, from) {
        }
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body{
	margin:0px ;
	padding:0px;
}
  .el-table__column-filter-trigger {
      display: inline-block;
      line-height: 0px !important;
      cursor: pointer;
  }

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 500ms;
  position: absolute;
}

.slide-right-enter {
  opacity: 0;
  transform: translateX(-100%);
}

.slide-right-leave-active {
  opacity: 0;
  transform: translateX(100%);
}

.slide-left-enter {
  opacity: 0;
  transform: translateX(100%);
}

.slide-left-leave-active {
  opacity: 0;
  transform: translateX(-100%);
}
</style>
