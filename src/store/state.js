export default {
    get UserToken() {
        // return localStorage.getItem('token')
        return true
    },
    set UserToken(value) {
        localStorage.setItem('token', value)
    },

    /* 导航菜单是否折叠 */
    isSidebarNavCollapse: false,
    /* 面包屑导航列表 */
    crumbList: []
}
