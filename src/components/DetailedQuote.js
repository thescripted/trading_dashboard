import React, { useEffect, useState } from "react"
import {
  formatCurrentPrice,
  formatDifference,
  formatPercentage,
  getAccessToken,
} from "../support"

const DetailedQuote = ({ tickerToFetch, isLineGraph, setLineGraph }) => {
  const [content, setContent] = useState({})
  useEffect(() => {
    fetch(
      `https://api.tdameritrade.com/v1/marketdata/${tickerToFetch}/quotes`,
      {
        headers: new Headers({
          Authorization: `Bearer ${getAccessToken()}`,
        }),
      }
    )
      .then((res) => res.json())
      .then((res) => setContent(res[tickerToFetch]))
  }, [tickerToFetch])

  const date = new Date()
  date.setDate(date.getDate() - 1)
  const {
    description,
    mark,
    markChangeInDouble,
    markPercentChangeInDouble,
  } = content

  return (
    <div className="flex flex-col w-full md:w-1/4 space-y-2 p-4 self-start box-border">
      {content.mark && (
        <>
          <div className="flex flex-row justify-between text-xl md:text-l lg:text-xl font-bold border-b-2 border-black space-x-1 ">
            <h2>{tickerToFetch}:US</h2>
            <h2 className="font-normal text-right break-normal">
              {description}
            </h2>
          </div>
          <div className="flex flex-col subheading items-start md:items-end">
            <span className="flex flex-row items-end space-x-1">
              <h1 className="text-3xl font-bold">{formatCurrentPrice(mark)}</h1>
              <p className="text-xs mb-1">USD</p>
            </span>
            <div
              className={`flex flex-row ${
                markChangeInDouble >= 0 ? "text-green-600" : "text-red-600"
              } space-x-2 text-l`}
            >
              <p>{formatDifference(markChangeInDouble)}</p>
              <p> {formatPercentage(markPercentChangeInDouble)}</p>
            </div>
            <p className="text-sm text-gray-600">
              Last Updated: {date.toLocaleDateString()}
            </p>
            <button
              className="py-1 px-4 font-semibold text-blue-700 border border-blue-600 mt-3 hover:border-transparent hover:text-white hover:bg-blue-600 rounded"
              onClick={() => setLineGraph(!isLineGraph)}
            >
              Toggle
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default DetailedQuote
