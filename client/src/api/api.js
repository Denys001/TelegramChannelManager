import axios from 'axios'
import request from './request'
const bot_token = "1523418706:AAEKsqYr1apnySDnao40hzl0Cxn0Xc8a7As"

export let authAPI = {
    async login(data) {
        return await request('http://127.0.0.1:5000/api/auth/login', "POST", data)
    },
    async register(data) {
        return await request('http://127.0.0.1:5000/api/auth/register', "POST", data)
    }
}
export let channelAPI = {
    async channels(token) {
        return await request('http://127.0.0.1:5000/api/channels', "GET", null, {
            'Authorization': `bearer ${token}`
        })
    },
    async add(code, token) {
        return await request('http://127.0.0.1:5000/api/channels/add', "POST", { code }, {
            'Authorization': `bearer ${token}`
        })
    }
}
export const postAPI = {
    async create(data) {
        const { token, content, channel, image } = data
        if (image) {
            const fd = new FormData()
            fd.append('photo', image, image.name)
            fd.append('caption', content)
            fd.append('chat_id', channel.telegramId)
            fd.append('parse_mode', 'html')
            const res = await axios.post(`https://api.telegram.org/bot${bot_token}/sendPhoto`, fd, {
                headers: {
                    'Content-Type': "multipart/form-data"
                }
            })
            const fd_server = new FormData()
            fd_server.append('photo', image, image.name)
            fd_server.append('channelId', channel._id)
            fd_server.append('telegramId', res.data.result.message_id)
            fd_server.append('content', content || '')
            return await axios.post('http://127.0.0.1:5000/api/posts/createWithPhoto', fd_server, {
                headers: {
                    'Authorization': `bearer ${token}`,
                    'Content-Type': "multipart/form-data",
                }
            })
        } else {
            return await request('http://127.0.0.1:5000/api/posts/create', "POST", { content, channelId: channel._id, telegramId: channel.telegramId }, {
                'Authorization': `bearer ${token}`
            })
        }
    },
    async getPosts({channel, token, pageNumber, pageSize }) {
        return await request(`http://127.0.0.1:5000/api/posts/${channel}?pageNumber=${pageNumber}&pageSize=${pageSize}`, "GET", null, {
            'Authorization': `bearer ${token}`
        })
    }
}