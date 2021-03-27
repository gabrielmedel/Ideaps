import React from "react"
import { useQuery, gql } from "@apollo/client"

const GET_NAMES = gql`
  query NAMES_QUERY {
    test {
      id
      name
      date
    }
  }
`

export const Test = () => {
  function Names() {
    const { loading, error, data } = useQuery(GET_NAMES)

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error</p>

    return data.test.map(({ name, id, date }) => (
      <div key={id}>
        <p>{id}</p>
        <p>
          {name}: {date}
        </p>
      </div>
    ))
  }
  return (
    <div>
      <Names />
    </div>
  )
}
