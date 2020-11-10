import * as type from './mutations_types'
import { login } from 'api/index'
import { Toast } from 'mint-ui';
export default {
    namespaced: true,
    state: {
        token: localStorage.getItem('token') || '',
        user: JSON.parse(localStorage.getItem('userDate')) || {}
    },
    mutations: {

        [type.LOGIN](state, data) {
            let userDate = data.data;
            state.token = userDate.token;
            state.user = userDate;
            localStorage.setItem('token', userDate.token)
            localStorage.setItem('userDate', JSON.stringify(userDate))
        }

    },
    actions: {
        async login(state, data) {
            try {
                let res = await login({
                    username: data.username,
                    password: data.password
                })
                state.commit(type.LOGIN, res);
                Toast({
                    message: '登录成功',
                    position: 'middle',
                    duration: 2000
                });
                setTimeout(() => {
                    const redirect = data.$route.query.fullPath || '/';
                    data.$router.replace({
                        path: redirect
                    })
                }, 3000);
            } catch (error) {
            }
        },
        async wxLogin (state, data) {
            try {
                const res = await login({
                    code: data.code
                })
                console.log('res', res);
                console.log('data.router', data.$router);
                state.commit(type.LOGIN, res)
                setTimeout(() => {
                    const redirect = data.$route.query.fullPath || '/';
                    window.location.href = redirect; // 微信分享平台兼容 改成强跳
                }, 300)
            } catch (error) {
                data.$router.replace({
                    path: '/'
                })
                console.log('rror', error);
            }
        }
    },
    getters: {
        token(state) {
            return state.token
        },
        user(state) {
            console.log('state', state);
            return state.user
        }
    }
}
