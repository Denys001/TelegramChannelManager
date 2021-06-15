const {Schema, Types, model} = require('mongoose')

const schema = new Schema({
    telegramId: {type: String, required: true},
    content: {type: String, required: true},
    image: {type: String, required: true, default: "uploads\\not-found.png"},
    date: { type: Date, require: true.valueOf, default: Date.now()},
    channelId: { type: Types.ObjectId, ref: 'Channel'},
    inArchive: { type: Boolean, required: true, default: false}, 
    inTrash: { type: Boolean, required: true, default: false},
    type: {type: String, required: true, default: "default"}
})

module.exports = model('Post', schema)