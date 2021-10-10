import axios from 'axios'

export default {
    getCourselist({ commit }, categoryId) {
        axios
          .get('http://localhost/course_laravel/public/api/products/' + categoryId)
          .then(response => { commit('SET_COURSELIST', response.data) });
    }
}