import { coreApi } from './api.js'

export const productApi = {
    getProducts(type = '') {
        return coreApi.get('products?type=' + type)
    },
    getCategoryProducts(categoryId, type, order) {
        return coreApi.get('categories/' + categoryId + '/products?type=' + type + '&order=' + order)
    },
    getProduct(id) {
        return coreApi.get('products/' + id)
    },
    registerProduct(obj) {
        return coreApi.postAuth('orders', obj)
    },
    setNotiNewClass(productId) {
        return coreApi.getAuth('notices/new-class?productId=' + productId)
    },
    stripeWebhook(obj) {
        return coreApi.postAuth('stripe/webhook', obj)
    }
}
