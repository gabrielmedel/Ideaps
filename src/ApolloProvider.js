import React from "react"
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from "@apollo/client"
import env from "react-dotenv"
import { setContext } from "@apollo/client/link/context"

const authLink = setContext((request, previousContext, { headers }) => {
  if (env.TOKEN_KEY) {
    const token = localStorage.getItem("5x=dA7jWjndR!e@Uj^%V")
    return {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    }
  } else {
    return {
      headers: {
        ...headers,
        Authorization: "",
      },
    }
  }
})

const link = new HttpLink({
  uri: env.GRAPHQL_URL,
  // Additional options
})

export const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache(),
})

export const Apollo = props => {
  return <ApolloProvider client={client}>{props.children}</ApolloProvider>
}
