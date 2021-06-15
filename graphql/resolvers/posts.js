const Post = require('../../models/Post')
const checkAuth = require('../../util/check-auth')
const { AuthenticationError } = require('apollo-server')

module.exports = {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find().sort({ createdAt: -1 })
                return posts
            } catch (err) {
                throw new Error(err)
            }
        },

        async getPost(_, { postId }) {
            try {
                const post = await Post.findById(postId)
                if (post) {
                    return post
                } else {
                    throw new Error('Post not found')
                }
            } catch (err) {
                throw new Error({ err })
            }
        },
    },

    Mutation: {
        async createPost(_, { title, body, categories, image }, context) {
            const user = checkAuth(context)

            if (title.trim() === '') {
                throw new Error('Your idea has to have a title')
            }

            if (body.trim() === '') {
                throw new Error('Your idea has to have a description')
            }

            if (categories[0] === '') {
                throw new Error('Your idea has to have at least one category')
            }

            const newPost = new Post({
                username: user.username,
                title: title,
                categories: categories,
                image: image,
                body: body,
                createdAt: new Date().toISOString(),
            })
            const post = await newPost.save()

            return post
        },

        async deletePost(_, { postId }, context) {
            const user = checkAuth(context)

            try {
                const post = await Post.findById(postId)
                if (user.username === post.username) {
                    await post.delete()

                    return 'Post deleted succsesfully'
                } else {
                    throw new AuthenticationError('Action not allowed')
                }
            } catch (err) {
                throw new Error(err)
            }
        },
    },
}
