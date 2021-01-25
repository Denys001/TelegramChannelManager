import request from './request'

export let authAPI = {
    login(data){
        return request('http://127.0.0.1:5000/api/auth/login', "POST", data)
    },
    register(data) {
        return request('http://127.0.0.1:5000/api/auth/register', "POST", data)
    }
}