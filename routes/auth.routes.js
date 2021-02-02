const { Router } = require('express')
const User = require('../models/User')
const RefreshToken = require('../models/RefreshToken')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const jsonWebToken = require('jsonwebtoken')
const config = require('config')
const router = Router()

router.post(
    '/register',
    [
        check('email', "Введіть електроний адрес").notEmpty(),
        check('email', "Неправильний формат електроного адресу").isEmail(),
        check('nickName', "Введіть нікнейм").notEmpty(),
        check('nickName', "Довжина нікнейму повина бути мінімум 6 букв").isLength({ min: 6 }),
        check('password', "Введіть пароль").notEmpty(),
        check('password', "Довжина паролю повина бути мінімум 6 букв").isLength({ min: 6 }),
        check('passwordConfirm', "Введіть пароль для пітвердження").notEmpty(),
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
            const { nickName, password, passwordConfirm, email } = req.body
            const condidate = await User.findOne({ email })
            if (condidate) {
                return res.status(400).json({
                    "message": "Даний електроний адрес зайнятий іншим користувачем",
                    field: "email",
                    "ResultCode": 1
                })
            }
            if (password !== passwordConfirm) {
                return res.status(400).json({
                    "message": "Паролі не співпадають",
                    field: "password",
                    "ResultCode": 1
                })
            }
            const hasedPassword = await bcrypt.hash(password, 12)
            const user = new User({
                nickName, password: hasedPassword, email
            })
            await user.save()
            res.status(201).json({
                "message": "Користувач був створений",
                "ResultCode": 0
            })
        } catch (e) {
            res.status(500).json({
                "message": "Something is wrong: " + e.message,
                "ResultCode": 1
            })
        }
    })
router.post(
    '/login',
    [
        check('email', "Введіть електроний адрес").notEmpty(),
        check('email', "Неправильний формат електроного адресу").isEmail(),
        check('password', "Введіть пароль").notEmpty(),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: "Некоректні дані",
                    errors: errors.array(),
                    "ResultCode": 1
                })
            }
            const { password, email } = req.body
            const user = await User.findOne({ email })
            if (!user) {
                return res.status(400).json({
                    message: "Користувач не знайдений або пароль неправильний",
                    field: "email",
                    "ResultCode": 1
                })
            }
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).json({
                    message: "Користувач не знайдений або пароль неправильний",
                    field: "email",
                    "ResultCode": 1
                })
            }
            const token = jsonWebToken.sign(
                {
                    userId: user.id
                },
                config.get('jwtSecret'),
                {
                    expiresIn: '1h'
                }
            )
            const refreshToken = new RefreshToken({
                token: jsonWebToken.sign(
                    {
                        userId: user.id
                    },
                    config.get('jwtSecretRefresh')
                )
            })
            await refreshToken.save()
            res.status(200).json({
                token,
                refreshToken: refreshToken.token,
                message: "Авторизація успішна",
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

router.post('/token', async (req, res) => {
    try {
        const refreshToken = req.body.token
        if (refreshToken == null)
            return res.status(401).json({
                ResultCode: 1,
                message: "токен обов'язкове поле"
            })
        const tmp = await RefreshToken.findOne({ token: refreshToken })
        if (!tmp)
            return res.status(403).json({
                ResultCode: 1,
                message: "токен неправильний"
            })
        jsonWebToken.verify(refreshToken, config.get('jwtSecretRefresh'), (err, user) => {
            if (err) return res.status(403).json({
                ResultCode: 1,
                message: err.message
            })
            const accessToken = jsonWebToken.sign(
                {
                    userId: user.userId
                },
                config.get('jwtSecret'),
                {
                    expiresIn: '1h'
                }
            )
            res.status(200).json({ accessToken, ResultCode: 0 })
        })
    } catch (error) {
        res.status(500).json({
            "message": "Something is wrong: " + error.message,
            "ResultCode": 1
        })
    }
})

router.delete('/logout', async (req, res) => {
    try {
        const {token} = req.body
        if (token == null)
            return res.status(401).json({
                ResultCode: 1,
                message: "токен обов'язкове поле"
            })
        await RefreshToken.deleteOne({token})
        res.status(204).json({
            "ResultCode": 0
        })
    } catch (error) {
        res.status(500).json({
            "message": "Something is wrong: " + error.message,
            "ResultCode": 1
        })
    }

})
module.exports = router