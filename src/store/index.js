import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user/index'
import indexList from './modules/index/index'
Vue.use(Vuex)
export default new Vuex.Store({
    modules: { user, indexList }
})
