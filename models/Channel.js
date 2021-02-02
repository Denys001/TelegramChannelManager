const {Schema, Types, model} = require('mongoose')

const schema = new Schema({
    telegramId: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    owner: { type: Types.ObjectId, ref: 'User'}
})

module.exports = model('Channel', schema)