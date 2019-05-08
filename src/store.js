import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        direction:'forward'
    },
    mutations: {
        updateDirection (state, direction) {
            state.direction = direction
          }
    },
    actions: {}
})
