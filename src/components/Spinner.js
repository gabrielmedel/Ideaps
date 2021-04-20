import React from "react"

export const Spinner = ({ size }) => {
  if (size === "small") {
    return <div className="loader small-spinner"></div>
  }

  if (size === "big") {
    return <div className="loader big-spinner"></div>
  }

  if (size === "medium") {
    return <div className="loader medium-spinner"></div>
  } else {
    return <div className="loader"></div>
  }
}
