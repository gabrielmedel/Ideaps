import React, { useState } from "react"

// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond"

// Import FilePond styles
import "filepond/dist/filepond.min.css"

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation"
import FilePondPluginImagePreview from "filepond-plugin-image-preview"
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css"

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)
// Our app

export const ImageDropzone = () => {
  const [files, setFiles] = useState([])
  return (
    <FilePond
      className="image-dropzone"
      files={files}
      onaddfilestart={console.log(files)}
      onupdatefiles={setFiles}
      maxFiles={2}
      server={{
        url: "https://api.imgbb.com/1/upload",
        process: {
          url: "?expiration=600&key=823b80bd112da5db19786670c6d1a289",
          method: "POST",
          withCredentials: true,
          headers: {
            "Accept": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Connection": "keep-alive",
            "Content-Type": "application/json",
          },
          timeout: 7000,
          onload: null,
          onerror: null,
        },
      }}
      name="files"
      labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
    />
  )
}
