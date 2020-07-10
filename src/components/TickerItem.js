import React, { useState, useEffect } from "react"

const formatQuotePercentage = (current, previous) => {
  const calculation = (current / previous - 1) * 100
  return calculation.toFixed(2).concat("%")
}

const formatQuoteDifference = (current, previous) => {
  const calculation = current - previous
  return calculation.toFixed(2)
}

const TickerItem = ({ quote }) => {
  const [marketData, setMarketData] = useState(0)
  useEffect(() => {
    fetch(
      `https://finnhub.io/api/v1/quote?symbol=${quote}&token=${process.env.REACT_APP_FINHUB_API_KEY}`
    )
      .then((res) => res.json())
      .then((res) =>
        setMarketData({
          current: res.c,
          previous: res.pc,
        })
      )
    console.log("rendered")
  }, [quote])

  return (
    <div className="block w-64 h-20 text-sm px-5 py-3 flex flex-col space-y-1 bg-gray-100 border-r-2 border-gray-200 hover:bg-gray-200">
      <div className="space-x-2 flex justify-between">
        <span className="font-bold">{quote} - Nasdaq</span>
        <span>{marketData.current}</span>
      </div>
      <div className="space-x-2 text-green-700 ">
        <span className="inline-flex">
          <svg
            width="12"
            height="8"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 12 8"
          >
            <path
              fill="none"
              stroke="currentcolor"
              strokeLinecap="round"
              strokeWidth="2"
              d="m1 6 5-4 5 4"
            ></path>
          </svg>
        </span>
        <span className="text-2xl font-bold">
          {formatQuotePercentage(marketData.current, marketData.previous)}
        </span>
        <span>
          {formatQuoteDifference(marketData.current, marketData.previous)}
        </span>
      </div>
    </div>
  )
}

export default TickerItem
