import React from "react"
import InfoTooltip from "./InfoTooltip"

export const TextArea = React.forwardRef(
  ({ label, handleFocus, name, placeholder, tooltipText, ...props }, ref) => (
    <div className="text-area-component-wrapper">
      <div className="label-info">
        <label htmlFor={name}>{label}</label>
        <InfoTooltip text={tooltipText}></InfoTooltip>
      </div>
      <div className="white-space" />
      <textarea
        onFocus={handleFocus}
        ref={ref}
        name={name}
        placeholder={placeholder}
        {...props}
        className={`text-area-component input-share-text-area ${props.className}`}
      />
    </div>
  )
)
