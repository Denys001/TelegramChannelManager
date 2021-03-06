const express = require('express')
const config = require('config')
const mongoose = require('mongoose')


const app = express()
app.use(express.json({extended: true}))
app.use('/uploads', express.static('uploads'))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/channels', require('./routes/channels.routes'))
app.use('/api/posts', require('./routes/posts.routes'))

const PORT = config.get('port') || 5000
const DB = config.get('mongoDB')

async function start(){
    try {
        await mongoose.connect(DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
    } catch (error) {
        console.log(`Server error: ${error.message}`)
        process.exit(1)
    }
}
start()
app.listen(PORT, () => {
    console.log(`Server has been started on port: ${PORT}`);
})