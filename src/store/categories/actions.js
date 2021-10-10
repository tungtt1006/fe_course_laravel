import axios from 'axios'

export default {
    getCategorylist({ commit }) {
        axios
          .get('http://localhost/course_laravel/public/api/categories')
          .then(response => { commit('SET_CATEGORYLIST', response.data) });
    }
}