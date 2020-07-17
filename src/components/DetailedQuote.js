import React, { useEffect, useState } from "react"
import {
  formatCurrentPrice,
  formatDifference,
  formatPercentage,
} from "../support/index"

const DetailedQuote = ({ tickerToFetch }) => {
  const [content, setContent] = useState({})
  useEffect(() => {
    fetch(
      `https://api.tdameritrade.com/v1/marketdata/${tickerToFetch}/quotes`,
      {
        headers: new Headers({
          Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
        }),
      }
    )
      .then((res) => res.json())
      .then((res) => setContent(res[tickerToFetch]))
  }, [tickerToFetch])

  window.content = content

  const {
    description,
    mark,
    markChangeInDouble,
    markPercentChangeInDouble,
  } = content

  return (
    <div className="flex flex-col w-1/4 space-y-2 p-4 self-start">
      {content.mark && (
        <>
          <div className="flex flex-row justify-between text-xl font-bold border-b-2 border-black space-x-1 ">
            <h2>{tickerToFetch}:US</h2>
            <h2 className="font-normal text-right">{description}</h2>
          </div>
          <div className="flex flex-col subheading items-end">
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
              Last Updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </>
      )}
    </div>
  )
}

export default DetailedQuote
