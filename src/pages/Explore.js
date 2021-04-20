import { gql, useQuery } from "@apollo/client"
import { Post } from "../components/Post"
import { Spinner } from "../components/Spinner"

const GET_POST = gql`
  query getPosts {
    getPosts {
      id
      body
      title
      interactionsCount
    }
  }
`

export const Explore = () => {
  const { loading, error, data } = useQuery(GET_POST, {
    fetchPolicy: "cache",
  })

  if (loading)
    return (
      <div className="fullPage">
        <Spinner />
      </div>
    )

  if (error) return `Error! ${error.message}`

  return (
    <>
      <div className="masonry-wrapper">
        <div className="masonry">
          {data.getPosts.map(post => (
            <Post key={post.id} post={post}></Post>
          ))}
        </div>
      </div>
    </>
  )
}
