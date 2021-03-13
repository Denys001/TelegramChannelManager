const { Router } = require('express')
const multer = require('multer');
const { check, validationResult } = require('express-validator')
var crypto = require('crypto')
const Post = require('../models/Post')
const Channel = require('../models/Channel')
const isAuth = require('../middleware/isAuth.middleware')
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
    '/create',
    [
        check('content', "Контент обов'язковий").notEmpty(),
        check('telegramId', "TelegranId обов'язкове").notEmpty(),
        check('channelId', "Id каналу обов'язкове").notEmpty(),
    ],
    isAuth,
    async (req, res) => {
        try {
            const errors = validationResult(req.body)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: "Не коректні дані",
                    errors: errors.array(),
                    "ResultCode": 1
                })
            }
            const { content, telegramId, channelId } = req.body
            const result = await api.sendMessage(content, telegramId)
            const post = new Post({
                telegramId: result.result.message_id,
                content,
                channelId,
                date: Date.now()
            })
            await post.save()
            try {
                await api.delete(telegramId, parseInt(post.telegramId) + 1)
            } catch (error) {

            }
            res.status(201).json({
                "message": "Пост створено був створений",
                "ResultCode": 0
            })
        } catch (e) {
            res.status(500).json({
                "message": "Something is wrong: " + e.message,
                "ResultCode": 1
            })
        }
    }
)
router.post(
    '/createWithPhoto',
    [
        check('telegramId', "TelegranId обов'язкове").notEmpty(),
        check('channelId', "Id каналу обов'язкове").notEmpty(),
    ],
    isAuth,
    upload.single('photo'),
    async (req, res) => {
        try {
            const errors = validationResult(req.body)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: "Не коректні дані",
                    errors: errors.array(),
                    "ResultCode": 1
                })
            }
            const { channelId, telegramId, content } = req.body
            const post = new Post({
                telegramId,
                content: content || ' ',
                channelId,
                image: req.file.path,
                date: Date.now()

            })
            await post.save()
            try {
                const id_del = await Channel.findOne({ _id: channelId })
                console.log(id_del.telegramId, parseInt(post.telegramId) + 1);
                await api.delete(id_del.telegramId, parseInt(post.telegramId) + 1)
            } catch (error) {

            }
            res.status(201).json({
                "message": "Пост створено був створений",
                "ResultCode": 0
            })
        } catch (e) {
            res.status(500).json({
                "message": "Something is wrong: " + e.message,
                "ResultCode": 1
            })
        }
    }
)
router.get('/:channel_id', isAuth, async (req, res) => {
    try {
        const userId = req.user.userId
        const channel_id = req.params.channel_id
        const posts = await Post.find({ channelId: channel_id }).sort({ date: -1 })
        var { pageNumber, pageSize } = req.query
        const amount = posts.length
        pageNumber = pageNumber || 1
        pageSize = pageSize || 10
        const pagesCount = Math.ceil(amount / pageSize)

        res.status(201).json({
            posts: posts.slice(pageSize * pageNumber - pageSize, pageSize * pageNumber),
            amount,
            "ResultCode": 0
        })
    } catch (e) {
        res.status(500).json({
            message: "Пости не знайдено",
            "ResultCode": 1
        })
    }
})
router.get('/dublicate/:channel_id/:message_id', isAuth, async (req, res) => {
    try {
        const userId = req.user.userId
        const channel_id = req.params.channel_id
        const message_id = req.params.message_id

        const message = await Post.findOne({ channelId: channel_id, _id: message_id })
        const channel = await Channel.findOne({ _id: channel_id })
        const result = await api.dublicate(channel.telegramId, message.telegramId)
        const post = new Post({
            telegramId: result.result.message_id,
            image: message.image,
            date: Date.now(),
            content: message.content,
            channelId: message.channelId
        })
        await post.save()
        try {
            await api.delete(channel.telegramId, parseInt(post.telegramId) + 1)
        } catch (error) {

        }
        res.status(201).json({
            "message": "Пост створено був створений",
            "ResultCode": 0
        })
    } catch (e) {
        res.status(500).json({
            message: "Пости не знайдено " + e.message,
            "ResultCode": 1
        })
    }
})
router.delete('/:message_id', isAuth, async (req, res) => {
    try {
        const message_id = req.params.message_id
        const message = await Post.findOne({ _id: message_id })
        const channel = await Channel.findOne({ _id: message.channelId })
        const result = await api.delete(channel.telegramId, message.telegramId)
        await Post.deleteOne({ _id: message_id })
        res.status(201).json({
            "message": "Пост був видалено",
            "ResultCode": 0
        })
    } catch (e) {
        res.status(500).json({
            message: "Пости не знайдено " + e.message,
            "ResultCode": 1
        })
    }
})
module.exports = router