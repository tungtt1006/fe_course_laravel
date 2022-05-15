import { coreApi } from './api.js'

export const periodApi = {
    getPeriods(classId, from, to) {
        return coreApi.getAuth('classes/' + classId + '/periods?from=' + from + '&to=' + to)
    }
}
