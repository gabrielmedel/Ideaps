import React, { useRef } from "react"
import { Input } from "../components/Input"

export const Share = () => {
  const inputRef = useRef(null)

  function handleFocus(e) {
    console.log(e.target.value)
  }

  return (
    <div className="add-idea-wrapper">
      <div className="add-idea-container">
        <Input ref={inputRef} handleFocus={handleFocus} />
        <br />
        <Input ref={inputRef} handleFocus={handleFocus} />
      </div>
    </div>
  )
}
