import { coreApi } from './api.js'

export const bannerApi = {
    getBanners() {
        return coreApi.get('banners')
    }
}