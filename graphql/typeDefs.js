const { gql } = require('apollo-server')

module.exports = gql`
    type Post {
        id: ID!
        userImage: String!
        createdAt: String!
        title: String!
        body: String!
        image: String!
    }
    type User {
        id: ID!
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
    type Query {
        getPosts: [Post]
    }
    type Mutation {
        register(registerInput: RegisterInput): User!
        login(email: String!, password: String!): User!
    }
`
