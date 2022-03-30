import { coreApi } from './api.js'

export const authApi = {
    login(object) {
        return coreApi.post('login', object)
    },
    register(formData) {
        return coreApi.post('register', formData)
    },
    logout() {
        return coreApi.postAuth('logout')
    }
}