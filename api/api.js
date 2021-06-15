const axios = require('axios')
const config = require('config')
const utf8 = require('utf8')
var fs = require('fs');
var telegram = require('telegram-bot-api');

const bot_token = "1523418706:AAEKsqYr1apnySDnao40hzl0Cxn0Xc8a7As"

var bot = new telegram({
    token: bot_token,
    updates: {
        enabled: true,
        get_interval: 1000
    }
});

const instance = axios.create({
    baseURL: `https://api.telegram.org/bot${config.get('botToken')}/`
});


const usersAPI = {
    send: async (channel_id, caption, image) => {
        if (image) {
            const data = await bot.sendPhoto({
                chat_id: channel_id,
                caption,
                photo: image,
                parse_mode: 'html'
            })
            return data
        } else {
            const data = await bot.sendMessage({
                chat_id: channel_id,
                text: caption,
                parse_mode: 'html'
            })
            return data
        }
    },
    sendQuiz: async (channel_id, quiz) => {
        const data = await bot.sendPoll({
            chat_id: channel_id,
            ...quiz
        })
        return data
    },
    dublicate: async (chat_id, message_id) => {
        const result = await instance.get(`copyMessage?chat_id=${chat_id}&from_chat_id=${chat_id}&message_id=${message_id}`)

        return result.data
    },
    delete: async (chat_id, message_id) => {
        try {
            const result = await bot.deleteMessage({
                chat_id,
                message_id
            })
            return result.data
        } catch (error) {
            //console.log(error);
            usersAPI.delete(chat_id, message_id)
        }
    },
    getAmoutOfSubscribers: async (chat_id) => {
        const result = await instance.get(`getChatMembersCount?chat_id=${chat_id}`)
        return result.data
    },
    editTitleChannel: async (chat_id, text) => {
        const data = await bot.setChatTitle({
            chat_id, title: text
        })
        return data
    },
    editDescrptionChannel: async (chat_id, text) => {
        const data = await bot.setChatDescription({
            chat_id, description: text
        })
        return data
    },
    editPhotoChannel: async (chat_id, photo) => {
        const data = await bot.setChatPhoto({
            chat_id, photo
        })
        return data
    },
}
//dlete ip postman on api
module.exports = usersAPI