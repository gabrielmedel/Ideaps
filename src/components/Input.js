import React from "react"
import InfoTooltip from "./InfoTooltip"
export const Input = React.forwardRef(
  ({ handleFocus, name, placeholder, label, tooltipText, ...props }, ref) => (
    <div className="input-component">
      <div className="label-info">
        <label htmlFor={name}>{label}</label>
        <sup>
          <InfoTooltip text={tooltipText}>{tooltipText}</InfoTooltip>
        </sup>
      </div>
      <div className="white-space"></div>
      <input
        onFocus={handleFocus}
        ref={ref}
        name={name}
        placeholder={placeholder}
        {...props}
        className={`input-share ${props.className}`}
      />
    </div>
  )
)
