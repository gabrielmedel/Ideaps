import React from "react"
import "react-dropzone-uploader/dist/styles.css"
import Dropzone from "react-dropzone-uploader"

const ImagesUploader = () => {
  // specify upload params and url for your files
  const getUploadParams = ({ file }) => {
    const body = new FormData()
    body.append("file", file)
    body.append("upload_preset", "{preset-name}")
    body.append("api_key", "234458112536414")
    return { url: "https://api.cloudinary.com/v1_1/{cloud-name}/image/upload", body }
  }

  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }, status) => {
    console.log(status, meta, file)
  }

  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files, allFiles) => {
    console.log(files.map(f => f.meta))
    allFiles.forEach(f => f.remove())
  }

  return (
    <Dropzone
      onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
      multiple={true}
      inputContent="Add images"
      inputWithFilesContent="More"
      submitButtonContent="Save images"
    />
  )
}

export default ImagesUploader
