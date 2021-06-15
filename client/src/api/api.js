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
    },
    async statistic({ token, channel }) {
        return await request(`http://127.0.0.1:5000/api/channels/${channel}/statistic`, "GET", null, {
            'Authorization': `bearer ${token}`
        })
    },
    async edit({ token, channel, name, description, photo}) {
        try {
            const fd = new FormData()
            fd.append('name', name)
            fd.append('description', description)
            if(photo){
                fd.append('photo', photo, photo.name)
            }
            return await axios.post(`http://127.0.0.1:5000/api/channels/${channel}`, fd, {
                headers: {
                    'Authorization': `bearer ${token}`,
                    //'Content-Type': "multipart/form-data",
                }
            })
        } catch (error) {
            console.log(error.message);
        }
    },
    async delete({ token, channel}) {
        try {
            return await axios.delete(`http://127.0.0.1:5000/api/channels/${channel}`, {
                headers: {
                    'Authorization': `bearer ${token}`,
                    //'Content-Type': "multipart/form-data",
                }
            })
        } catch (error) {
            console.log(error.message);
        }
    },
}
export const postAPI = {
    async create(data) {
        const { token, content, channel, image, inArchive } = data
        try {
            const fd = new FormData()
            if (image) {
                fd.append('photo', image, image.name)
            }
            fd.append('content', content)
            fd.append('channelId', channel._id)
            var url = inArchive
                ? 'http://127.0.0.1:5000/api/posts/send?inArchive'
                : 'http://127.0.0.1:5000/api/posts/send'
            return await axios.post(url, fd, {
                headers: {
                    'Authorization': `bearer ${token}`,
                    'Content-Type': "multipart/form-data",
                }
            })
        } catch (error) {
            console.log(error.message);
        }
    },
    async createQuiz(data) {
        const { token, content, channel, inArchive } = data
        try {
            const fd = new FormData()
            fd.append('content', content)
            fd.append('channelId', channel)
            var url = inArchive
                ? 'http://127.0.0.1:5000/api/posts/send?inArchive&isQuiz'
                : 'http://127.0.0.1:5000/api/posts/send?isQuiz'
            return await axios.post(url, fd, {
                headers: {
                    'Authorization': `bearer ${token}`,
                    'Content-Type': "multipart/form-data",
                }
            })
        } catch (error) {
            console.log(error.message);
        }
    },
    async getPosts({ channel, token, pageNumber, pageSize }) {
        return await request(`http://127.0.0.1:5000/api/posts/channel/${channel}?pageNumber=${pageNumber}&pageSize=${pageSize}`, "GET", null, {
            'Authorization': `bearer ${token}`
        })
    },
    async getPostsInArchive({ channel, token, pageNumber, pageSize }) {
        return await request(`http://127.0.0.1:5000/api/posts/channel/${channel}/archive?pageNumber=${pageNumber}&pageSize=${pageSize}`, "GET", null, {
            'Authorization': `bearer ${token}`
        })
    },
    async getPostsInTrash({ channel, token, pageNumber, pageSize }) {
        return await request(`http://127.0.0.1:5000/api/posts/channel/${channel}/trash?pageNumber=${pageNumber}&pageSize=${pageSize}`, "GET", null, {
            'Authorization': `bearer ${token}`
        })
    },
    async untrash({ message, token, flag }) {
        if (flag) {
            return await request(`http://127.0.0.1:5000/api/posts/untrash/${message}?inArchive`, "GET", null, {
                'Authorization': `bearer ${token}`
            })
        } else {
            return await request(`http://127.0.0.1:5000/api/posts/untrash/${message}`, "GET", null, {
                'Authorization': `bearer ${token}`
            })
        }
    },
    async dublicate({ channel, message, token }) {
        return await request(`http://127.0.0.1:5000/api/posts/dublicate/${channel}/${message}`, "GET", null, {
            'Authorization': `bearer ${token}`
        })
    },
    async delete({ message, token }) {
        return await request(`http://127.0.0.1:5000/api/posts/${message}`, "DELETE", null, {
            'Authorization': `bearer ${token}`
        })
    },
    async trash({ message, token }) {
        return await request(`http://127.0.0.1:5000/api/posts/trash/${message}`, "GET", null, {
            'Authorization': `bearer ${token}`
        })
    },
    async archive({ message, token }) {
        return await request(`http://127.0.0.1:5000/api/posts/archive/${message}`, "GET", null, {
            'Authorization': `bearer ${token}`
        })
    },
    async copyToArchive({ message, token }) {
        return await request(`http://127.0.0.1:5000/api/posts/archive/${message}/copy`, "GET", null, {
            'Authorization': `bearer ${token}`
        })
    },
    async copyAndUnarchive({ message, token }) {
        return await request(`http://127.0.0.1:5000/api/posts/unarchive/${message}/copy`, "GET", null, {
            'Authorization': `bearer ${token}`
        })
    },
    async unarchive({ message, token }) {
        return await request(`http://127.0.0.1:5000/api/posts/unarchive/${message}`, "GET", null, {
            'Authorization': `bearer ${token}`
        })
    },
    async show({ id, token }) {
        return await request(`http://127.0.0.1:5000/api/posts/${id}`, "GET", null, {
            'Authorization': `bearer ${token}`
        })
    }
}