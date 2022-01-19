import { coreApi } from './api.js'

export const newsApi = {
    getNewsHome(pageSize) {
        return coreApi.get('news?pagesize=' + pageSize)
    }
}