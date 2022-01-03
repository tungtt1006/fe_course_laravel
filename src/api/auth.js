import { coreApi } from './api.js'

export const authApi = {
    login(formData) {
        return coreApi.post('login', formData)
    } 
}