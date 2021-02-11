import axios from 'axios'
import request from './request'
const bot_token = "1523418706:AAEKsqYr1apnySDnao40hzl0Cxn0Xc8a7As"

export let authAPI = {
    login(data) {
        return request('http://127.0.0.1:5000/api/auth/login', "POST", data)
    },
    register(data) {
        return request('http://127.0.0.1:5000/api/auth/register', "POST", data)
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
    async create(token, content, channel, image) {
        console.log(image);
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
            console.log(res.data);
            return await axios.post('http://127.0.0.1:5000/api/posts/createWithPhoto', fd, {
                headers: {
                    'Authorization': `bearer ${token}`,
                    'Content-Type': "multipart/form-data",
                }
            })
        }else{
            return await request('http://127.0.0.1:5000/api/posts/create', "POST", { content, channelId: channel._id, telegramId: channel.telegramId }, {
                'Authorization': `bearer ${token}`
            })
        }
    }
}