const {Schema, Types, model} = require('mongoose')

const schema = new Schema({
    token: {type: String, required: true}
})

module.exports = model('RefreshToken', schema)