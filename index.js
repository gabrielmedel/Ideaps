const { ApolloServer } = require('apollo-server')
require('dotenv').config()
const mongoose = require('mongoose')
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')

const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    context: ({ req }) => ({ req }),
})

mongoose
    .connect(process.env.DATABASE_CONNECT, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('MongoDB connected')
        return server.listen({ port: process.env.PORT || 8080 })
    })
    .then((res) => {
        console.log(`server running at ${res.url}`)
    })
