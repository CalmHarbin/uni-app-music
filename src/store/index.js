import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import state from './state.js'
import mutations from './mutations.js'
import action from './actions.js'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
    state: state,
    mutations: mutations,
    actions: action,
    strict: debug,
    plugins: debug ? [createLogger()] : []
})

export default store
