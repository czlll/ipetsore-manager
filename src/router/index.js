import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/login/index'
import NotFound from '@/views/404'
// import Forbidden from 'pages/errorPage/403'
/* Layout */
import Layout from '@/views/layout/Layout'
import Home from '@/views/home/index'

Vue.use(Router)

/* 初始路由 */
export default new Router({
    routes: [
        {
            path: '/login',
            component: Login
        }
    ]
})

/* 准备动态添加的路由 */
export const DynamicRoutes = [
    {
        path: '',
        component: Layout,
        name: 'container',
        redirect: 'home',
        meta: {
            requiresAuth: true,
            name: '首页'
        },
        children: [
            {
                path: 'home',
                component: Home,
                name: 'home',
                meta: {
                    name: '首页',
                    icon: 'home'
                }
            }
        ]
    },
    {
        path: '*',
        component: NotFound
    }
]
