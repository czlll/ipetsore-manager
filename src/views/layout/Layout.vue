<template>
    <div :class="{navCollapsed:isSidebarNavCollapse}">
        <sidebarNav  class="sidebar"/>
        <mainContent/>
    </div>
</template>

<script>
import sidebarNav from './components/Sidebar/sidebar-nav'
import mainContent from './components/main-content/'
import { mapState } from 'vuex'
export default {
    data() {
        return {}
    },
    computed: {
        ...mapState(['isSidebarNavCollapse'])
    },
    components: {
        sidebarNav,
        mainContent
    }
}
</script>

<style lang="scss" scoped>

</style>
