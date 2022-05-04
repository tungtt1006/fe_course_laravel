import { coreApi } from './api.js'

export const classApi = {
    getLearningClass() {
        return coreApi.getAuth('classes/learning')
    }
}
