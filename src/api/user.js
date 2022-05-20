import { coreApi } from './api.js'

export const userApi = {
    getUser() {
        return coreApi.getAuth('users/show')
    },
    updateUser(user) {
        return coreApi.putAuth('users/update', user)
    }
}
