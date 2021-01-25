const { Router } = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const jsonWebToken = require('jsonwebtoken')
const config = require('config')
const router = Router()

router.post(
    '/register',
    [
        check('email', "Введіть електроний адрес").exists().notEmpty(),
        check('email', "Неправильний формат електроного адресу").isEmail(),
        check('nickName', "Введіть нікнейм").exists().notEmpty(),
        check('nickName', "Довжина нікнейму повина бути мінімум 6 букв").isLength({ min: 6 }),
        check('password', "Введіть пароль").exists().notEmpty(),
        check('password', "Довжина паролю повина бути мінімум 6 букв").isLength({ min: 6 }),
        check('passwordConfirm', "Введіть пароль для пітвердження").exists().notEmpty(),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: "Не коректні дані",
                    errors: errors.array(),
                    "ResualtCode": 1
                })
            }
            const { nickName, password, passwordConfirm, email } = req.body
            const condidate = await User.findOne({ email })
            if (condidate) {
                return res.status(400).json({
                    "message": "Даний електроний адрес зайнятий іншим користувачем",
                    field: "email",
                    "ResualtCode": 1
                })
            }
            if (password !== passwordConfirm) {
                return res.status(400).json({
                    "message": "Паролі не співпадають",
                    field: "password",
                    "ResualtCode": 1
                })
            }
            const hasedPassword = await bcrypt.hash(password, 12)
            const user = new User({
                nickName, password: hasedPassword, email
            })
            await user.save()
            const token = jsonWebToken.sign(
                {
                    userId: user.id
                },
                config.get('jwtSecret'),
                {
                    expiresIn: '1h'
                }
            )
            res.status(201).json({
                token,
                "message": "Користувач був створений",
                "ResualtCode": 0
            })
        } catch (e) {
            res.status(500).json({
                "message": "Something is wrong: " + e.message,
                "ResualtCode": 1
            })
        }
    })
router.post(
    '/login',
    [
        check('email', "Введіть електроний адрес").exists().notEmpty(),
        check('email', "Неправильний формат електроного адресу").isEmail(),
        check('password', "Введіть пароль").exists().notEmpty(),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: "Некоректні дані",
                    errors: errors.array(),
                    "ResualtCode": 1
                })
            }
            const { password, email } = req.body
            const user = await User.findOne({ email })
            if (!user) {
                return res.status(400).json({
                    message: "Користувач не знайдений або пароль неправильний",
                    field: "email",
                    "ResualtCode": 1
                })
            }
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).json({
                    message: "Користувач не знайдений або пароль неправильний",
                    field: "email",
                    "ResualtCode": 1
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
            res.status(200).json({
                token,
                message: "Авторизація успішна",
                "ResualtCode": 0
            })

        } catch (e) {
            res.status(500).json({
                "message": "Something is wrong: " + e.message,
                "ResualtCode": 1
            })
        }

    })
module.exports = router