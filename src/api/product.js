import { coreApi } from './api.js'

export const productApi = {
    getHotProducts() {
        return coreApi.get('products/hot')
    },
    getNewestProducts(pageSize = 4) {
        return coreApi.get('products/newest?page_size=' + pageSize)
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
