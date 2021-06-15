const Post = require('../../models/Post')
const checkAuth = require('../../util/check-auth')
const { AuthenticationError, UserInputError } = require('apollo-server')
const { PossibleTypeExtensionsRule } = require('graphql')

module.exports = {
    Mutation: {
        createComment: async (_, { postId, body }, context) => {
            const { username } = checkAuth(context)

            if (body.trim() === '') {
                throw new UserInputError('Empty Comment')
                errors: {
                    body: 'Comment body must not be empty'
                }
            }

            const post = await Post.findById(postId)

            if (post) {
                post.comments.unshift({
                    body,
                    username,
                    createdAt: new Date().toISOString(),
                })

                await post.save()

                return post
            } else {
                throw new UserInputError('Post not found')
            }
        },

        async deleteComment(_, { postId, commentId }, context) {
            const { username } = checkAuth(context)

            const post = await Post.findById(postId)

            if (post) {
                const commentIndex = post.comments.findIndex(
                    (c) => c.id === commentId
                )

                if (post.comments[commentIndex].username === username) {
                    post.comments.splice(commentIndex, 1)
                    await post.save()
                    return 'Comment deleted succesfully'
                } else {
                    throw new AuthenticationError('Action not allowed')
                }
            } else {
                throw new UserInputError('Comment not found')
            }
        },

        async collaborate(_, { postId }, context) {
            const { username } = checkAuth(context)

            const post = await Post.findById(postId)

            if (post) {
                if (
                    post.collaborations.find(
                        (collaboration) => collaboration.username === username
                    )
                ) {
                    //Already collaborating

                    post.collaborations = post.collaborations.filter(
                        (collaboration) => collaboration.username !== username
                    )
                } else {
                    //not collaborating

                    post.collaborations.push({
                        username,
                        createdAt: new Date().toISOString(),
                    })
                }

                await post.save()

                return post
            } else {
                throw new UserInputError('Post not found')
            }
        },

        async interact(_, { postId }, context) {
            const { username } = checkAuth(context)

            const post = await Post.findById(postId)

            if (post) {
                if (
                    post.interactions.find(
                        (interactions) => interactions.username === username
                    )
                ) {
                    //Already collaborating
                } else {
                    //not collaborating
                    post.interactions.push({
                        username,
                    })
                }

                await post.save()

                return post
            } else {
                throw new UserInputError('Post not found')
            }
        },

        async save(_, { postId }, context) {
            const { username, id } = checkAuth(context)

            const post = await Post.findById(postId)

            if (post) {
                if (post.saves.find((save) => save.username === username)) {
                    //Already saved
                    post.saves = post.saves.filter(
                        (save) => save.username !== username
                    )
                } else {
                    //not saved
                    post.saves.push({
                        username,
                        createdAt: new Date().toISOString(),
                    })
                }

                await post.save()

                return post
            } else {
                throw new UserInputError('Post not found')
            }
        },
    },
}
