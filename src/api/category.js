import { coreApi } from './api.js'

export const categoryApi = {
    getCategory() {
        return coreApi.get('categories')
    },
    getAnotherCategory(categoryId) {
        return coreApi.get('categories?except=' + categoryId)
    }
}