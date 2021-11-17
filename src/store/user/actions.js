export default {
    setUser({ commit }, x) {
        if(Object.keys(x).length == 0) {
            commit('SET_USER', {});   
        } else {
            commit('SET_USER', x);
        }
    }
}