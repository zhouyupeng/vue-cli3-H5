import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import store from 'store/index'
import wxAuth from './views/wxAuth'// 授权登录
Vue.use(Router)
const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            meta: {
                auth: false, // 是否需要登录
                keepAlive: false // 是否缓存组件
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
                auth: true,
                keepAlive: false
            }
        },
        {
            path: '/wxAuth',
            name: 'wxAuth',
            component: wxAuth,
            meta: {
                auth: false, // 是否需要登录
                keepAlive: false, // 是否缓存组件
                title: '登录中'
            }

        },
        {
            path: '/login',
            name: 'login',
            component: () =>
                import(/* webpackChunkName: "login" */ './views/login.vue'),
            meta: {
                auth: false,
                keepAlive: false
            }
        },
        {
            path: '*', // 未匹配到路由时重定向
            redirect: '/',
            meta: {
                // auth: true,
                // keepAlive: true
            }
        }
    ]
})

// 全局路由钩子函数 对全局有效
router.beforeEach((to, from, next) => {
    let auth = to.meta.auth
    let token = store.getters['login/token'];
    if (to.meta.keepAlive == false) {
        console.log('不需要缓存 ');
        setTimeout(() => {
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        }, 10)
    } else {
        console.log('需要缓存' + store.state.scrollTop[to.name]);
        setTimeout(() => {
            document.documentElement.scrollTop = store.state.scrollTop[to.name];
            document.body.scrollTop = store.state.scrollTop[to.name];
        }, 50)
    }
    if (auth) { // 需要登录
        if (token) {
            if (to.meta.title) {
                document.title = to.meta.title
            }
            next()
        } else {
            next({
                path: Vue.client.WEIXIN ? '/wxAuth' : '/login',
                query: {
                    fullPath: to.fullPath
                }
            })
        }
    } else {
        if (to.meta.title) {
            document.title = to.meta.title
        }
        next()
    }
})
// 结合keep-alive 实现记录列表页滚动条位置
router.beforeEach((to, from, next) => {
    console.log('from--', from);
    // 要离开页面如果设置为需要缓存，则本页是要记住上滚动高度到vuex中，以便下次进来恢复高度
    if (from.meta.keepAlive == true) {
        store.commit('recordScroll', {
            name: from.name,
            num: document.documentElement.scrollTop || document.body.scrollTop
        }); // document.body.scrollTop一定要加不然iOS上会失效，本人亲测，踩坑
    }
    next()
})
export default router
