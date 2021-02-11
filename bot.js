const TG = require('telegram-bot-api')
const config = require('config')

const api = new TG({
    token: config.get('botToken', {
        polling:{
            interval: 100,
            autoStart: true,
        }
    })
})

module.exports = api