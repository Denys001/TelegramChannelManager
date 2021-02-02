import request from './request'

export let authAPI = {
    login(data){
        return request('http://127.0.0.1:5000/api/auth/login', "POST", data)
    },
    register(data) {
        return request('http://127.0.0.1:5000/api/auth/register', "POST", data)
    }
}
export let channelAPI = {
    async channels(token){
        return await request('http://127.0.0.1:5000/api/channels', "GET", null, {
            'Authorization': `bearer ${token}`
        })
    },
    async add(code, token){
        return await request('http://127.0.0.1:5000/api/channels/add', "POST", {code}, {
            'Authorization': `bearer ${token}`
        })
    }
}