<template>
    <div class="menu-container">
        <template v-for="v in menuList" v-if="!v.hidden" >
            <el-submenu :index="v.name" v-if="v.children&&v.children.length>0" :key="v.name">
                <template slot="title">
                    <svg-icon v-if="v.meta.icon" :icon-class="v.meta.icon" ></svg-icon>
                    <!-- <i class="iconfont" :class="v.meta.icon"></i> -->
                    <span style="margin-left: 8px;">{{v.meta.name}}</span>
                </template>
                <el-menu-item-group>
                    <my-nav :menuList="v.children"></my-nav>
                </el-menu-item-group>
            </el-submenu>
            
            <el-menu-item :key="v.name" :index="v.name" @click="gotoRoute(v.name)" v-else>
              <svg-icon v-if="v.meta.icon" :icon-class="v.meta.icon"></svg-icon>
                <!-- <i class="iconfont" :class="v.meta.icon"></i> -->
                <span slot="title">{{v.meta.name}}</span>
            </el-menu-item>
        </template>
    </div>
</template>

<script>
export default {
    name: 'my-nav',
    props: {
        menuList: {
            type: Array,
            default: function() {
                return []
            }
        }
    },
    methods: {
        gotoRoute(name) {
            this.$router.push({ name })
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
