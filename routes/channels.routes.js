const { Router } = require('express')
const { check, validationResult } = require('express-validator')
const isAuth = require('../middleware/isAuth.middleware')
const config = require('config')
const axios = require('axios')
const Channel = require('../models/Channel')
const Post = require('../models/Post')
const api = require('../api/api')

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
            for (var el of result) {
                if (el.hasOwnProperty('message')) {
                    if (el.message.text === code) {
                        const chat_id = el.message.forward_from_chat.id
                        const chat_name = el.message.forward_from_chat.title
                        const dublicate = await Channel.findOne({ telegramId: chat_id, owner: userId })
                        if (!dublicate) {
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
            const channels = await Channel.find({ owner: userId })
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
router.get('/:id/statistic', isAuth, async (req, res) => {
    try {
        const id = req.params.id
        const channel = await Channel.findOne({ _id: id })
        var posts = await Post.find({ channelId: id })
        var only_date = []
        for( var i of posts){
            only_date.push(i.date)
        }
        posts = only_date
        const count = posts.length
        var posts_current_year = posts.filter(el => el.getYear() === new Date(Date.now()).getYear())
        const posts_current_year_data = []
        var avg_month = 0, min = 0, max = 0
        const result = await api.getAmoutOfSubscribers(channel.telegramId)
        posts = posts.sort((a, b) => a - b)
        var tmp = {
            '0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0,
        }
        for (var i of posts_current_year) {
            tmp[i.getMonth()]++
        }
        tmp['12'] = tmp['0']
        delete tmp['0']
        for (var i in tmp) {
            posts_current_year_data.push(tmp[i])
            avg_month+= tmp[i]
        }
        avg_month =  Math.trunc(avg_month / (new Date(Date.now()).getMonth()+1))
        min = posts[0]
        max = posts[posts.length-1]
        var posts_every_day = [], j = new Date(min), end_date = new Date(max)
        if(min){
            while(true){
                if(j.setHours(0,0,0,0) === end_date.setHours(0,0,0,0)){
                    break
                }
                posts_every_day.push(posts.filter(el => new Date(el).setHours(0,0,0,0).valueOf() === j.valueOf()).length)
                j.setDate(j.getDate() + 1)
            }
        }
        res.status(201).json({
            "message": "Статистика каналу",
            "ResultCode": 0,
            statistic: {
                postAmount: count,
                amounOfSubscribers: result.result,
                avgPostInMonth: avg_month,
                dateOfTheFirstPost: posts[0],
                dateOfTheLastPost: posts[posts.length-1],
                postsCurrentYearData: posts_current_year_data,
                postsEveryDayData: posts_every_day
            }
        })
    } catch (e) {
    res.status(500).json({
        message: "Пости не знайдено " + e.message,
        "ResultCode": 1
    })
}
})
module.exports = router