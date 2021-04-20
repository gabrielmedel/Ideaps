import React from "react"
import Truncate from "react-truncate"

export const Post = ({ id, post: { title, body, interactionsCount } }) => {
  return (
    <div id={id} className="masonry-item">
      <div className="post-wrapper">
        <h3>{title}</h3>
        <div className="categories"></div>
        <Truncate width={1000} lines={1} ellipsis={"..."}>
          {body}
        </Truncate>
        <p>{interactionsCount}</p>
      </div>
    </div>
  )
}
