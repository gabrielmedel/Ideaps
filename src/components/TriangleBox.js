import React from "react"

export const TriangleBox = props => {
  if (props.show) {
    return (
      <div className="dropdown">
        <div className="arrow_box">
          <ul>
            <li>
              <p>Challenges</p>
            </li>
            <li>
              <p>Front-End</p>
            </li>
            <li>
              <p>Back-end</p>
            </li>
            <li>
              <p>Ideas Policy</p>
            </li>
          </ul>
        </div>
      </div>
    )
  }
  if (!props.show) {
    return null
  }
}
