import { coreApi } from './api.js'

export const teacherApi = {
    getTeachers() {
        return coreApi.get('teachers')
    },
}
