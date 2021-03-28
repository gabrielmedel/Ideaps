import React, { useState } from "react"
import "./styles/App.css"
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"
import { Test } from "./Test"
import { createHttpLink } from "@apollo/react-hooks"
import { setContext } from "@apollo/client/link/context"
import env from "react-dotenv"

const httpLink = createHttpLink({
  uri: env.API_URL,
})

const defaulRole = env.DEFAULT_TOKEN

const token = JSON.parse(localStorage.getItem("token"))

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `${token}`,
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

function App() {
  const [logged] = useState(false)
  !logged
    ? localStorage.setItem("token", JSON.stringify(defaulRole))
    : localStorage.setItem("token", JSON.stringify("defaulRole"))

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
