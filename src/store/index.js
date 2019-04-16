import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login/index'
import indexList from './modules/index/index'
Vue.use(Vuex)
export default new Vuex.Store({
    modules: { login, indexList }
})
