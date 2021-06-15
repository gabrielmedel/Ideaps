import React, { useRef } from "react"
import { Input } from "../components/Input"
import { TextArea } from "../components/TextArea"
import ScrollMemory from "react-router-scroll-memory"
import { ImageDropzone } from "../components/ImageDropzone"
import SelectTags from "../components/SelectTags"

export const Share = () => {
  const titleRef = useRef(null)
  const descriptionRef = useRef(null)

  function handleFocus(e) {
    console.log(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    console.log(titleRef.current.value)
  }

  return (
    <>
      <div className="white-space" />
      <div className="add-idea-wrapper">
        <ScrollMemory />
        <div className="share-introduction">
          <h2>Share your idea to the world</h2>
          <span className="">
            You never know if your idea will be the next big thing, share your thoughts about it,
            potential of the idea...
          </span>
        </div>

        <div className="white-space" />
        <form className="add-idea-container" onSubmit={handleSubmit}>
          <div className="title-tags-container">
            <div className="idea-title">
              <Input
                tooltipText="The title of your idea, just be creative"
                label="Title"
                ref={titleRef}
                handleFocus={handleFocus}
              />
            </div>
            <div className="tags-container">
              <div className="input-tag">
                <SelectTags
                  tooltipText="Select the tags related to the category or the necessary technology to develop the idea, you have a maximum of 3 tags"
                  label="Tags"
                  className="input-tag"></SelectTags>
              </div>
            </div>
          </div>
          <div className="white-space-5" />
          <TextArea
            tooltipText="Describe your idea giving as much information as possible to attract people to help you"
            label="Description"
            ref={descriptionRef}></TextArea>
          <div className="white-space-5" />
          <div className="idea-link">
            <Input
              tooltipText="Put a useful link to a more extensive information such as a design, prototype, code..."
              label="Link"
              ref={titleRef}
              handleFocus={handleFocus}
            />
          </div>
          <div className="white-space-5" />
          <ImageDropzone></ImageDropzone>

          <div className="submit-wrapper">
            <div className="submit-container">
              <div
                className="primaryButton"
                style={{
                  backgroundColor: "#ffcccb",
                }}>
                <p>Cancel</p>
              </div>
              <div className="primaryButton">
                <p>Create</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
