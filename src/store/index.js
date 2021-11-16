import Vue from 'vue'
import Vuex from 'vuex'

// Import modules
import categories from './categories/index.js'
import courses from './courses/index.js'
import user from './user/index.js'

Vue.use(Vuex)

const storeData = {
    modules: {
        categories,
        courses,
        user
    }
}
const store = new Vuex.Store(storeData)

export default store