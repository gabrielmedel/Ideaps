import React from "react"
import "./styles/App.css"
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"
import { Test } from "./Test"
import { createHttpLink } from "@apollo/react-hooks"
import { setContext } from "@apollo/client/link/context"

const httpLink = createHttpLink({
  uri: "https://ideaps-project.herokuapp.com/v1/graphql",
})

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsiYW5vbnltb3VzIl0sIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFub255bW91cyIsIngtaGFzdXJhLXVzZXItaWQiOiIxMjM0NTY3ODkwIiwieC1oYXN1cmEtb3JnLWlkIjoiMTIzIiwieC1oYXN1cmEtY3VzdG9tIjoiMSJ9fQ.tUFhwyFQkyKIibB1JLn-giMLlVWIFwl_opRub7QDtqA`,
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <div>
          <Test></Test>
        </div>
      </ApolloProvider>
    </div>
  )
}

export default App
