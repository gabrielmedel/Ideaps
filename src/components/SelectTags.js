import React from "react"
import Select from "react-select"
import InfoTooltip from "./InfoTooltip"

export const colourOptions = [
  { value: "General", label: "General", color: "#00B8D9" },
  { value: "blue", label: "Blue", color: "#0052CC", disabled: true },
  { value: "purple", label: "Purple", color: "#5243AA" },
  { value: "red", label: "Red", color: "#FF5630" },
  { value: "orange", label: "Orange", color: "#FF8B00" },
  { value: "yellow", label: "Yellow", color: "#FFC400" },
  { value: "green", label: "Green", color: "#36B37E" },
  { value: "forest", label: "Forest", color: "#00875A" },
  { value: "slate", label: "Slate", color: "#253858" },
  { value: "silver", label: "Silver", color: "#666666" },
  { value: "green", label: "Green", color: "#36B37E" },
  { value: "forest", label: "Forest", color: "#00875A" },
  { value: "slate", label: "Slate", color: "#253858" },
  { value: "silver", label: "Silver", color: "#666666" },
  { value: "green", label: "Green", color: "#36B37E" },
  { value: "forest", label: "Forest", color: "#00875A" },
  { value: "slate", label: "Slate", color: "#253858" },
  { value: "silver", label: "Silver", color: "#666666" },
  { value: "green", label: "Green", color: "#36B37E" },
  { value: "forest", label: "Forest", color: "#00875A" },
  { value: "slate", label: "Slate", color: "#253858" },
  { value: "silver", label: "Silver", color: "#666666" },
]

export const flaviorOptions = [
  { value: "vanilla", label: "Vanilla", rating: "safe" },
  { value: "chocolate", label: "Chocolate", rating: "good" },
  { value: "strawberry", label: "Strawberry", rating: "wild" },
  { value: "salted-caramel", label: "Salted Caramel", rating: "crazy" },
]

const MAX_OPTIONS = 3

export default class SelectTags extends React.Component {
  state = { maxReached: false, selectedOptions: colourOptions.slice(0, 1) }
  onChange = (selectedOptions, { action, option }) => {
    console.log(action, option)
    // bail if user is trying to add an option once max reached
    if (action === "select-option" && this.state.maxReached) {
      return
    }

    // set max reached once achieved
    if (action === "select-option" && selectedOptions.length === MAX_OPTIONS) {
      this.setState({ maxReached: true })
    }

    // business as usual, except we want to revert max flag on remove/clear
    const maxReached = selectedOptions.length >= MAX_OPTIONS
    this.setState({ maxReached, selectedOptions })
  }
  noOptionsMessage = ({ inputValue }) => {
    const { maxReached } = this.state
    return maxReached
      ? `You can only select ${MAX_OPTIONS} tags`
      : `No tag matching "${inputValue}"`
  }
  render() {
    const { maxReached, selectedOptions } = this.state

    return (
      <>
        <div className="label-info">
          <label htmlFor={this.props.name}>{this.props.label}</label>{" "}
          <InfoTooltip text={this.props.tooltipText}></InfoTooltip>
        </div>

        <div className="white-space"></div>
        <Select
          onChange={this.onChange}
          options={maxReached ? selectedOptions : colourOptions}
          isMulti
          name={this.props.name}
          defaultValue="select"
          placeholder="select tags..."
          noOptionsMessage={this.noOptionsMessage}
          value={selectedOptions}
        />
      </>
    )
  }
}
