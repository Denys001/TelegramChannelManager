const axios = require('axios')
const config = require('config')
const utf8 = require('utf8')
var FormData = require('form-data');
var fs = require('fs');
const instance = axios.create({
    baseURL: `https://api.telegram.org/bot${config.get('botToken')}/`
});


const usersAPI = {
    sendMessage: async (content, chat_id) => {
        const result = await instance.get(`sendMessage?chat_id=${chat_id}&text=${utf8.encode(content)}&parse_mode=html`)
        return result.data
    },
    sendPhoto: async (content, chat_id, image) => {
        var fd = new FormData()
        if(image){
            fd.append('photo', fs.createReadStream(image))
        }
        fd.append('caption', utf8.encode(content).toString())
        fd.append('chat_id', chat_id.toString())
        fd.append('parse_mode', "html")
        const result = null
        try {
            result = await axios.post(`https://api.telegram.org/bot${config.get('botToken')}/sendPhoto`, fd, {
            headers: {
                'Content-Type': "multipart/form-data"
            }           
        })
        } catch (error) {
            console.log("erorr", error);
        }
        return result.data
    },
    dublicate: async (chat_id, message_id) => {
        const result = await instance.get(`copyMessage?chat_id=${chat_id}&from_chat_id=${chat_id}&message_id=${message_id}`)
        return result.data
    },
    delete: async (chat_id, message_id) => {
        const result = await instance.get(`deleteMessage?chat_id=${chat_id}&message_id=${message_id}`)
        return result.data
    },
    getAmoutOfSubscribers: async (chat_id) => {
        const result = await instance.get(`getChatMembersCount?chat_id=${chat_id}`)
        return result.data
    },
}
//dlete ip postman on api
module.exports = usersAPI