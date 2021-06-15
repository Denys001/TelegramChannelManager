const {Schema, Types, model} = require('mongoose')

const schema = new Schema({
    telegramId: {type: Number, required: true, unique: true},
    name: {type: String, required: true},
    description: {type: String, default: ""},
    owner: { type: Types.ObjectId, ref: 'User'},
    image: {type: String, default: "uploads\\not-found.png"},
    posts: [{ type: Types.ObjectId, ref: 'Post'}]
})

module.exports = model('Channel', schema)