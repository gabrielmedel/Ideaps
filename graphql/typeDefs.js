const { gql } = require('apollo-server')

module.exports = gql`
    type Post {
        id: ID!
        username: String!
        user: String!
        createdAt: String!
        title: String!
        body: String!
        categories: [Categories]
        image: String!
        comments: [Comments]
        saves: [Saves]
        collaborations: [Collaborations]
        collaborationsCount: Int
        interactionsCount: Int
    }

    type Saves {
        id: ID!
        createdAt: String!
        username: String!
    }

    type Comments {
        id: ID!
        createdAt: String!
        username: String!
        body: String!
    }

    type Collaborations {
        id: ID!
        createdAt: String!
        username: String!
    }

    type User {
        id: ID!
        userImage: String
        email: String
        token: String!
        username: String!
        createdAt: String!
    }

    input RegisterInput {
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }

    type Categories {
        categoryName: String!
    }

    input Category {
        categoryName: String!
    }

    type Query {
        getPosts: [Post]
        getPost(postId: ID!): Post
    }

    type Mutation {
        register(registerInput: RegisterInput): User!
        login(email: String!, password: String!): User!
        createPost(
            title: String!
            body: String!
            categories: [Category]
            image: String!
        ): Post!
        deletePost(postId: String!): String!

        createComment(postId: String!, body: String!): Post!
        deleteComment(postId: ID!, commentId: ID!): String

        collaborate(postId: ID!): Post!
        save(postId: ID!): Post!
    }
`
