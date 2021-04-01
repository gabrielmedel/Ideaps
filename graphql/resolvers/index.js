const postResolvers = require('./posts')
const userResolvers = require('./users')
const commentsResolvers = require('./comments')

module.exports = {
    Post: {
        collaborationsCount(parent) {
            return parent.collaborations.length
        },
        interactionsCount(parent) {
            const count =
                parent.collaborations.length +
                parent.comments.length +
                parent.saves.length
            return count
        },
    },
    Query: {
        ...postResolvers.Query,
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...postResolvers.Mutation,
        ...commentsResolvers.Mutation,
    },
}
