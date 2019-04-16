import * as type from './mutations_types'
import api from 'api/index.js'
console.log('api', api);

export default {
    data: {
        indexList: []
    },
    mutations: {
        [type.GET_INDEX_LIST](state, data) {
            state.indexList = data;
        }
    },
    actions: {
        getIndexList({ commit, state }) {

        }
    },
    getters: {
        getIndexList(state) {
            return state.indexList
        }
    }

}
