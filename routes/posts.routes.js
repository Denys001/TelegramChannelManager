const { Router } = require('express')
const multer = require('multer')
const { check, validationResult } = require('express-validator')
var fs = require('fs')

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
router.post('/send',
    isAuth,
    upload.single('photo'),
    async (req, res) => {
        try {
            const { channelId, content } = req.body
            const inArchive = req.query.hasOwnProperty('inArchive')
            const isQuiz = req.query.hasOwnProperty('isQuiz')
            const channel = await Channel.findById(channelId)
            var result;
            if (!inArchive) {
                if (isQuiz) {
                    result = await api.sendQuiz(channel.telegramId, JSON.parse(content))
                } else {
                    if (req.file) {
                        var file = fs.createReadStream(req.file.path)
                        result = await api.send(channel.telegramId, content, file)
                    } else {
                        result = await api.send(channel.telegramId, content, null)
                    }
                }
            }
            const post = new Post({
                telegramId: result ? result.message_id : -1,
                content: content || ' ',
                channelId,
                image: isQuiz ? 'uploads\\quiz.png' : (req.file ? req.file.path : 'uploads\\not-found.png'),
                date: Date.now(),
                inTrash: false,
                inArchive: inArchive,
                type: isQuiz ? "quiz" : "default",
            })
            post.save()
            if (!inArchive) {
                await delTrash(channel.telegramId, parseInt(post.telegramId) + 1)
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
router.get('/channel/:channel_id', isAuth, async (req, res) => {
    try {
        const userId = req.user.userId
        const channel_id = req.params.channel_id
        const posts = await Post.find({
            channelId: channel_id,
            inArchive: false,
            inTrash: false
        }).sort({ date: -1 })
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
router.get('/channel/:channel_id/trash', isAuth, async (req, res) => {
    try {
        const userId = req.user.userId
        const channel_id = req.params.channel_id
        const posts = await Post.find({
            channelId: channel_id,
            inArchive: false,
            inTrash: true
        }).sort({ date: -1 })
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
router.get('/channel/:channel_id/archive', isAuth, async (req, res) => {
    try {
        const userId = req.user.userId
        const channel_id = req.params.channel_id
        const posts = await Post.find({
            channelId: channel_id,
            inArchive: true,
            inTrash: false
        }).sort({ date: -1 })
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
router.get('/:post', isAuth, async (req, res) => {
    try {
        const userId = req.user.userId
        const id = req.params.post
        var post = await Post.findOne({ _id: id })
        const channel = await Channel.findOne({ _id: post.channelId })
        res.status(201).json({
            post,
            channelName: channel.name,
            "ResultCode": 0
        })
    } catch (e) {
        res.status(500).json({
            message: "Пости не знайдено" + e.message,
            "ResultCode": 1
        })
    }
})
router.get('/dublicate/:channel_id/:message_id', isAuth, async (req, res) => {
    try {
        const userId = req.user.userId
        const channel_id = req.params.channel_id
        const message_id = req.params.message_id

        const message = await Post.findOne({ _id: message_id })
        const channel = await Channel.findOne({ _id: channel_id })
        const result = await api.dublicate(channel.telegramId, message.telegramId)
        const post = new Post({
            telegramId: result.result.message_id,
            image: message.image,
            date: Date.now(),
            content: message.content,
            channelId: message.channelId,
            type: message.type
        })
        await post.save()
        await delTrash(channel.telegramId, parseInt(result.message_id) + 1)
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
        //const result = await api.delete(channel.telegramId, message.telegramId)
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
router.get('/unarchive/:message_id', isAuth, async (req, res) => {
    try {
        const message_id = req.params.message_id
        const message = await Post.findOne({ _id: message_id })
        const channel = await Channel.findById(message.channelId)
        var result
        if (message.type === 'default') {
            var file = message.image !== 'uploads\\not-found.png' ? fs.createReadStream(message.image) : null
            result = await api.send(channel.telegramId, message.content, file)
        } else {
            result = await api.sendQuiz(channel.telegramId, JSON.parse(message.content))
        }

        message.telegramId = result.message_id
        message.inArchive = false
        message.date = Date.now()
        message.save()
        await delTrash(channel.telegramId, parseInt(post.telegramId) + 1)
        res.status(201).json({
            "message": "Пост був створений",
            "ResultCode": 0
        })
    } catch (e) {
        res.status(500).json({
            message: e.message,
            "ResultCode": 1
        })
    }
})
router.get('/unarchive/:message_id/copy', isAuth, async (req, res) => {
    try {
        const message_id = req.params.message_id
        const message = await Post.findOne({ _id: message_id })
        const channel = await Channel.findById(message.channelId)

        var result
        if (message.type === 'default') {
            var file = message.image !== 'uploads\\not-found.png' ? fs.createReadStream(message.image) : null
            result = await api.send(channel.telegramId, message.content, file)
        } else {
            result = await api.sendQuiz(channel.telegramId, JSON.parse(message.content))
        }

        var new_message = new Post({
            channelId: message.channelId,
            content: message.content,
            image: message.image,
            inTrash: message.inTrash,
            type: message.type,
        })
        new_message.telegramId = result.message_id
        new_message.inArchive = false
        new_message.date = Date.now()
        new_message.save()

        await delTrash(channel.telegramId, parseInt(post.telegramId) + 1)
        res.status(201).json({
            "message": "Пост був створений",
            "ResultCode": 0
        })
    } catch (e) {
        res.status(500).json({
            message: e.message,
            "ResultCode": 1
        })
    }
})
router.get('/trash/:message_id', isAuth, async (req, res) => {
    try {
        const message_id = req.params.message_id
        const message = await Post.findOne({ _id: message_id })
        const channel = await Channel.findById(message.channelId)
        if (!message.inArchive) {
            const result = await api.delete(channel.telegramId, message.telegramId)
        }
        message.telegramId = -1
        message.inArchive = false
        message.inTrash = true
        message.date = Date.now()
        message.save()

        res.status(201).json({
            "message": "Пост був додан в корзину",
            "ResultCode": 0, message
        })
    } catch (e) {
        res.status(500).json({
            message: e.message,
            "ResultCode": 1
        })
    }
})
router.get('/archive/:message_id', isAuth, async (req, res) => {
    try {
        const message_id = req.params.message_id
        const message = await Post.findOne({ _id: message_id })
        const channel = await Channel.findById(message.channelId)

        const result = await api.delete(channel.telegramId, message.telegramId)

        message.telegramId = -1
        message.inArchive = true
        message.date = Date.now()
        message.save()

        res.status(201).json({
            "message": "Пост був додан в архів",
            "ResultCode": 0, message
        })
    } catch (e) {
        res.status(500).json({
            message: e.message,
            "ResultCode": 1
        })
    }
})
router.get('/archive/:message_id/copy', isAuth, async (req, res) => {
    try {
        const message_id = req.params.message_id
        const message = await Post.findOne({ _id: message_id })
        const channel = await Channel.findById(message.channelId)

        var new_message = new Post({
            channelId: message.channelId,
            content: message.content,
            image: message.image,
            inTrash: message.inTrash,
            type: message.type,
        })
        new_message.telegramId = -1
        new_message.inArchive = true
        new_message.date = Date.now()
        new_message.save()

        res.status(201).json({
            "message": "Пост був додан в архів",
            "ResultCode": 0, message, new_message
        })
    } catch (e) {
        res.status(500).json({
            message: e.message,
            "ResultCode": 1
        })
    }
})
router.get('/untrash/:message_id', isAuth, async (req, res) => {
    try {
        const message_id = req.params.message_id
        const message = await Post.findOne({ _id: message_id })
        const channel = await Channel.findById(message.channelId)

        const inArchive = req.query.hasOwnProperty('inArchive')

        if (inArchive) {
            message.inArchive = true
            message.inTrash = false
            message.date = Date.now()
            message.save()
        } else {
            var result
            if (message.type === 'default') {
                var file = message.image !== 'uploads\\not-found.png' ? fs.createReadStream(message.image) : null
                result = await api.send(channel.telegramId, message.content, file)
            } else {
                result = await api.sendQuiz(channel.telegramId, JSON.parse(message.content))
            }
            
            message.telegramId = result.message_id
            message.inArchive = false
            message.inTrash = false
            message.date = Date.now()
            message.save()
            await delTrash(channel.telegramId, parseInt(result.message_id) + 1)
        }

        res.status(201).json({
            "message": "Пост був створений",
            "ResultCode": 0, message
        })
    } catch (e) {
        res.status(500).json({
            message: e.message,
            "ResultCode": 1
        })
    }
})

const delTrash = async (channel, post) => {
    // try {
    //     await api.delete(telegramId, post)
    // } catch (error) {
    //     console.log(error.message);
    // }
}

module.exports = router