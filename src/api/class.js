import { coreApi } from './api.js'

export const classApi = {
    getLearningClass() {
        return coreApi.getAuth('classes/learning')
    },
    getRegisterClass() {
        return coreApi.getAuth('classes/register')
    },
    cancelClass(id) {
        return coreApi.deleteAuth('classes/' + id)
    }
}
