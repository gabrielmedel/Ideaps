import React from "react"
import { LogoutOutlined } from "@ant-design/icons"

export const TriangleBoxUser = props => {
  if (props.show) {
    return (
      <div ref={props.referent} className="dropdown">
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
            <li onClick={props.logout}>
              <p>
                <LogoutOutlined /> Logout
              </p>
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
