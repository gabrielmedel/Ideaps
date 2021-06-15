import React from "react"
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { GRAPHQL_URL, TOKEN_KEY } from "./env"

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("5x=dA7jWjndR!e@Uj^%V")
  return {
    ...headers,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      RefreshToken: TOKEN_KEY ? TOKEN_KEY : "",
    },
  }
})

const link = new HttpLink({
  uri: GRAPHQL_URL,
})

export const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache(),
  ssrMode: true,
})

const Apollo = props => {
  return <ApolloProvider client={client}>{props.children}</ApolloProvider>
}
Apollo.displayName = "Ideaps"
export default Apollo
