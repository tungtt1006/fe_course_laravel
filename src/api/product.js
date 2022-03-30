import { coreApi } from './api.js'

export const productApi = {
    getProducts(type = '') {
        return coreApi.get('products?type=' + type)
    },
    getCategoryProducts(categoryId) {
        return coreApi.get('categories/' + categoryId + '/products')
    },
    getProduct(id) {
        return coreApi.get('products/' + id)
    },
    registerProduct(obj) {
        return coreApi.postAuth('orders', obj)
    }
}