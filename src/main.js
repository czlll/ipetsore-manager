// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'//引入store

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import EffectInput from 'effect-input'
import 'effect-input/dist/index.css'
import animated from 'animate.css' // npm install animate.css --save安装，在引入
import './styles/index.scss'

import '@/icons'
import axios from "axios"
import * as globalFilter from './filters/filters'

Vue.prototype.$ajax= axios

Vue.use(ElementUI)
Vue.use(EffectInput)
Vue.use(animated)
Vue.config.productionTip = false
Object.keys(globalFilter).forEach(key => {
    Vue.filter(key, globalFilter[key])
})

router.beforeEach((to, from, next) => {
    if (!store.state.user.status) {
        if (
            to.matched.length > 0 &&
            !to.matched.some(record => record.meta.requiresAuth)
        ) {
            next()
        } else {
            next({ path: '/login' })
        }
    } else {
        if (!store.state.permission.permissionList) {
            store.dispatch('permission/FETCH_PERMISSION').then(() => {
                next({ path: to.path })
            })
        } else {
            if (to.path !== '/login') {
                next()
            } else {
                next(from.fullPath)
            }
        }
    }
})

router.afterEach((to, from, next) => {
    var routerList = to.matched
    store.commit('setCrumbList', routerList)
    store.commit('permission/SET_CURRENT_MENU', to.name)
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,//使用store
  components: { App },
  template: '<App/>'
})
