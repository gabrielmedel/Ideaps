import React from "react"
import { WarningOutlined } from "@ant-design/icons"
export const ErrorMessage = props => {
  if (props.error) {
    return (
      <p className="error-message">
        <WarningOutlined className="alertIcon" />
        {props.error}
      </p>
    )
  } else {
    return <div className="white-space"></div>
  }
}
