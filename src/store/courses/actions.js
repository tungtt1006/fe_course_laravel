import axios from 'axios'

export default {
    getCourselist({ commit }, filter) {
        axios
            .get('http://localhost/course_laravel/public/api/products/' + filter.parent_id + '?name=' + filter.name + '&order=' + filter.order)
            .then(response => { commit('SET_COURSELIST', response.data) });
    }
}