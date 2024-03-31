import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'

// dynamic router permission control (Experimental)
// import permission from './modules/async-router'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user
    },
    state: {

    },
    mutations: {

    },
    actions: {

    },
    getters
})
