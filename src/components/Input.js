import React from "react"

export const Input = React.forwardRef(({ handleFocus, name, placeholder, icon }, ref) => (
  <input
    onFocus={handleFocus}
    ref={ref}
    name={name}
    placeholder={placeholder}
    className="input-share"
  />
))
