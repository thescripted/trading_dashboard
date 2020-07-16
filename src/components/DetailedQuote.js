import React from "react"

const DetailedQuote = (props) => {
  return (
    <div className="flex flex-col space-y-2 flex-grow p-4 self-start">
      <div className="flex flex-row justify-between text-xl font-bold border-b-2 border-black ">
        <h2>AAPL:US</h2>
        <h2 className="font-normal">Apple Incorporated</h2>
      </div>
      <div className="flex flex-col subheading items-end">
        <span className="flex flex-row items-end space-x-1">
          <h1 className="text-3xl font-bold">1,516.27</h1>
          <p className="text-xs mb-1">USD</p>
        </span>
        <div className="flex flex-row text-green-600 space-x-2 text-l">
          <p>+ 19.74</p>
          <p> 1.32%</p>
        </div>
        <p className="text-sm text-gray-600">
          Last Updated: Jul 14, 2020 5:13 p.m. EDT
        </p>
      </div>
    </div>
  )
}

export default DetailedQuote
