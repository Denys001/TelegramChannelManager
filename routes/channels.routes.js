const { Router } = require('express')
const { check, validationResult } = require('express-validator')
const multer = require('multer')
const config = require('config')
const axios = require('axios')
var fs = require('fs')

const isAuth = require('../middleware/isAuth.middleware')

const Channel = require('../models/Channel')
const Post = require('../models/Post')
const api = require('../api/api')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        //cb(null, md5sum.update(file.originalname).digest('hex') + '.' + file.mimetype);
        cb(null, Date.now() + Math.floor(Math.random() * 100) + file.originalname);
    }
});

const upload = multer({
    storage: storage
});

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
                                name: chat_name,
                                description: ""
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
router.post(
    '/:id',
    isAuth,
    upload.single('photo'),
    async (req, res) => {
        try {
            const id = req.params.id
            const channel = await Channel.findOne({ _id: id })
            if (req.body.name) {
                api.editTitleChannel(channel.telegramId, req.body.name)
                channel.name = req.body.name
            }
            if (req.body.description) {
                api.editDescrptionChannel(channel.telegramId, req.body.description)
                channel.description = req.body.description
            }
            if (req.file) {
                var file = fs.createReadStream(req.file.path)
                api.editPhotoChannel(channel.telegramId, file)
                channel.image = req.file.path
            }
            channel.save()
            res.status(200).json({
                "ResultCode": 0,
                message: "Дані змінено"
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
        const now = new Date()
        now.setHours(0, 0, 0)
        const id = req.params.id
        const channel = await Channel.findOne({ _id: id })
        var posts = await Post.find({ channelId: id, inArchive: false, inTrash: false })

        var only_date = []
        for (var i of posts) {
            only_date.push(i.date)
        }
        posts = only_date
        var posts_current_year = posts.filter(el => el.getYear() === now.getYear())
        const posts_current_year_data = []
        var avg_month = 0
        const result = await api.getAmoutOfSubscribers(channel.telegramId)
        posts = posts.sort((a, b) => a - b)
        var tmp = {
            '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0,
        }
        for (var i of posts_current_year) {
            tmp[i.getMonth() + 1]++
        }
        // tmp['12'] = tmp['0']
        // delete tmp['0']
        for (var i in tmp) {
            posts_current_year_data.push(tmp[i])
            avg_month += tmp[i]
        }
        avg_month = Math.trunc(avg_month / (now.getMonth() + 1))


        var posts_last_month_data = {}
        var start_date = new Date(), end_date = new Date()
        start_date.setMonth(now.getMonth() - 1)
        start_date.setHours(0, 0, 0)
        end_date.setDate(now.getDate() + 1)
        end_date.setHours(0, 0, 0)
        const posts_last_month = await Post.find(
            {
                channelId: id,
                inArchive: false,
                inTrash: false,
                date: {
                    $gte: start_date,
                    $lte: end_date
                }
            }
        )
        for (
            var i = start_date;
            i < end_date;
            i.setDate(i.getDate() + 1)
        ) {

            posts_last_month_data[i.toLocaleDateString()] = 0
        }
        for (var i of posts_last_month) {
            var current = new Date(i.date)
            current.setHours(0, 0, 0, 0)
            posts_last_month_data[current.toLocaleDateString()] += 1
        }
        const inArchive = await Post.find({ channelId: id, inArchive: true, inTrash: false })
        const inTrash = await Post.find({ channelId: id, inArchive: false, inTrash: true })
        const default_posts = await Post.find({ channelId: id, inArchive: false, inTrash: false, type: "default" })
        const quiz_posts = await Post.find({ channelId: id, inArchive: false, inTrash: false, type: "quiz" })

        res.status(201).json({
            "message": "Статистика каналу",
            "ResultCode": 0,
            statistic: {
                postAmount: posts.length,
                archiveAmount: inArchive.length,
                trashAmount: inTrash.length,
                amounOfDefaultPosts: default_posts.length,
                amounOfQuizPosts: quiz_posts.length,
                amounOfSubscribers: result.result,
                //avgPostInMonth: avg_month,
                dateOfTheFirstPost: posts[0],
                dateOfTheLastPost: posts[posts.length - 1],
                postsCurrentYearData: posts_current_year_data,
                postsLastMonthData: posts_last_month_data
            }
        })
    } catch (e) {
        res.status(500).json({
            message: "Пости не знайдено " + e.message,
            "ResultCode": 1
        })
    }
})

router.delete(
    '/:id',
    isAuth,
    async (req, res) => {
        try {
            const id = req.params.id
            const channel = await Channel.deleteOne({ _id: id })
            res.status(200).json({
                "ResultCode": 0,
                message: "Канал видалено"
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