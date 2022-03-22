import axios from 'axios'

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    // headers: {
    //     Authorization: 'Bearer ' + localStorage.getItem('jwt')
    // }
})
// api.defaults.headers.post['Content-Type'] = 'multipart/form-data'

async function get(action) {
    return await api.get(action)
}

async function put(action, object) {
    let formData = new FormData()
    formData.append('_method', 'PUT')
    for (const property in object) {
        formData.append(property, object[property])
    }
    return await api.post(action, formData)
}

export const coreApi = {
    get,
    put
}