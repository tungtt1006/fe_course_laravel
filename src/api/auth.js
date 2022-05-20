import { coreApi } from './api.js'

export const authApi = {
    login(object) {
        return coreApi.post('login', object)
    },
    register(formData) {
        return coreApi.post('register', formData)
    },
    logout() {
        return coreApi.getAuth('logout')
    },
    authHealth() {
        return coreApi.getAuth('auth/health')
    },
    getUser() {
        return coreApi.getAuth('users')
    }
}
