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
                    const redirect = data.$route.query.redirect || '/';
                    data.$router.replace({
                        path: redirect
                    })
                }, 3000);
            } catch (error) {
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
