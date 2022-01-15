import { coreApi } from './api.js'

export const courseApi = {
    getHightlightCourse(pageSize = 5) {
        return coreApi.get('products?type=hightlight&pagesize=' + pageSize)
    },
    getNewestCourse(pageSize = 5) {
        return coreApi.get('products?type=newest&pagesize=' + pageSize)
    }
}