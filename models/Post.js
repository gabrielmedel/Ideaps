const { model, Schema } = require('mongoose')

const postSchema = new Schema({
    userImage: String,
    username: String,
    createdAt: String,
    title: String,
    body: String,
    categories: [
        {
            categoryName: String,
        },
    ],
    image: String,
    comments: [
        {
            body: String,
            username: String,
            createdAt: String,
        },
    ],
    collaborations: [
        {
            username: String,
            createdAt: String,
        },
    ],
    interactions: [
        {
            username: String,
        },
    ],
    saves: [
        {
            username: String,
            createdAt: String,
        },
    ],

    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
})

module.exports = model('Post', postSchema)
