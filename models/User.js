const { model, Schema } = require('mongoose')

const userSchema = new Schema({
    userImage: String,
    username: String,
    password: String,
    email: String,
    userImage: String,
    createdAt: String,
})

module.exports = model('User', userSchema)
