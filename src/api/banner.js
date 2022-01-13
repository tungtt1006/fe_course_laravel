import { coreApi } from './api.js'

export const bannerApi = {
    getBannersHome() {
        return coreApi.get('banners')
    }
}