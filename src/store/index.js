import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login/index'
import index from './modules/index/index'
Vue.use(Vuex)
export default new Vuex.Store({
    modules: { login, index },
    state: {
        scrollTop: {}
    },
    mutations: {
        recordScroll(state, data) {
            state.scrollTop[data.name] = data.num
        }
    },
    actions: {}
})
