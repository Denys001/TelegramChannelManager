const {Schema, Types, model} = require('mongoose')

const schema = new Schema({
    telegramId: {type: Number, required: true, unique: true},
    name: {type: String, required: true},
    owner: { type: Types.ObjectId, ref: 'User'},
    posts: [{ type: Types.ObjectId, ref: 'Post'}]
})

module.exports = model('Channel', schema)