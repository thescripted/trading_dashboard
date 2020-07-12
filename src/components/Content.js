import React from "react"

const Content = () => {
  return (
    <div
      style={{ height: "480px" }}
      className="flex flex-row space-x-2 w-3/4 mt-4 mx-auto bg-white shadow-md rounded"
    >
      <div className="search bg-blue-100 ">
        <p>Hello</p>
      </div>
      <div className="result bg-blue-100">
        <p> World</p>
      </div>
    </div>
  )
}

export default Content
