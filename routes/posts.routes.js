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
            console.log("result", result);
            const post = new Post({
                telegramId: result.result.message_id,
                content,
                channel: channelId
            })
            console.log(post);
            await post.save()
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
        check('content', "Контент обов'язковий").notEmpty(),
        check('telegramId', "TelegranId обов'язкове").notEmpty(),
        check('channelId', "Id каналу обов'язкове").notEmpty(),
    ],
    isAuth,
    upload.single('postsImage'),
    async (req, res) => {
        try {
            const { content, chat_id } = req.body

            // const errors = validationResult(req.body)
            // if (!errors.isEmpty()) {
            //     return res.status(400).json({
            //         message: "Не коректні дані",
            //         errors: errors.array(),
            //         "ResultCode": 1
            //     })
            // }
            //const {content, telegramId, channelId} = req.body
            //const result = await api.sendPhoto(content, telegramId, req.file.path)
            //console.log(result);
            // const post = new Post({
            //     telegramId: result.result.message_id,
            //     content,
            //     channel: channelId
            // })
            // if(req.file){
            //     post.image = req.file.path
            // }
            // console.log(post);
            // await post.save()
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
module.exports = router