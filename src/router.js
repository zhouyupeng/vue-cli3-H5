import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import store from 'store/index'
Vue.use(Router)
const router = new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            meta: {
                auth: true, // 是否需要登录
                keepAlive: true // 是否缓存组件
            }
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import(/* webpackChunkName: "about" */ './views/About.vue'),
            meta: {
                auth: false,
                keepAlive: true
            }
        },
        {
            path: '/login',
            name: 'login',
            component: () =>
                import(/* webpackChunkName: "login" */ './views/login.vue'),
            meta: {
                auth: false,
                keepAlive: true
            }
        }
    ]
})

// 全局路由钩子函数 对全局有效
router.beforeEach((to, from, next) => {
    let auth = to.meta.auth
    let token = store.getters['login/token'];

    if (auth) { // 需要登录
        if (token) {
            next()
        } else {
            next('/login')
        }
    } else {
        next()
    }
})
export default router
