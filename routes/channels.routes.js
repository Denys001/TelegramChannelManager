const { Router } = require('express')
const { check, validationResult } = require('express-validator')
const isAuth = require('../middleware/isAuth.middleware')
const config = require('config')
const axios = require('axios')
const Channel = require('../models/Channel')

const router = Router()

router.post(
    '/add',
    isAuth,
    [
        check('code', 'Код обов\'язкове поле').notEmpty()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: "Не коректні дані",
                    errors: errors.array(),
                    "ResultCode": 1
                })
            }
            const userId = req.user.userId
            const { code } = req.body
            var result = await axios.get(`https://api.telegram.org/bot${config.get('botToken')}/getUpdates`)
            result = result.data.result
            for( var el of result){
                if(el.hasOwnProperty('message')){
                    if(el.message.text === code){
                        const chat_id = el.message.forward_from_chat.id
                        const chat_name = el.message.forward_from_chat.title
                        const dublicate = await Channel.findOne({telegramId: chat_id, owner: userId})
                        if(!dublicate){
                            const channel = new Channel({
                                telegramId: chat_id,
                                owner: userId,
                                name: chat_name
                            })
                            channel.save()
                        }
                        return res.status(200).json({
                            "ResultCode": 0,
                            message: "Канал додано"
                        })
                    }
                    
                }
            }
            res.status(400).json({
                "ResultCode": 1,
                message: "Канал не знайдено або код неправильний"
            })
        } catch (error) {
            res.status(500).json({
                "message": "Something is wrong: " + error.message,
                "ResultCode": 1
            })
        }
    }
)
router.get(
    '/',
    isAuth,
    async (req, res) => {
        try {
            const userId = req.user.userId
            const channels = await Channel.find({owner: userId })
            return res.status(200).json({
                "ResultCode": 1,
                channels
            })
        } catch (error) {
            res.status(500).json({
                "message": "Something is wrong: " + error.message,
                "ResultCode": 1
            })
        }
    }
)
module.exports = router