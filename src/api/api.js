import axios from 'axios'

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    // headers: {
    //     Authorization: 'Bearer ' + localStorage.getItem('jwt')
    // }
})
api.defaults.headers.post['Content-Type'] = 'multipart/form-data'

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

async function post(action, object) {
    let formData = new FormData()
    for (const property in object) {
        formData.append(property, object[property])
    }
    return await api.post(action, formData)
}

async function postAuth(action, object) {
    let formData = new FormData()
    let login = JSON.parse(localStorage.getItem('login'))
    let token = login.token
    for (const property in object) {
        formData.append(property, object[property])
    }
    return await api.post(action, formData, { headers: {
            Authorization: 'Bearer ' + token
        }
    })
}

async function getAuth(action) {
    let login = JSON.parse(localStorage.getItem('login'))
    let token = login.token
    return await api.get(action, { headers: {
            Authorization: 'Bearer ' + token
        }
    })
}

export const coreApi = {
    get,
    put,
    post,
    postAuth,
    getAuth
}
