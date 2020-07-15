import React, { useState, useEffect } from "react"

//TODO: remap states into a reducer

const formatQuotePercentage = (current, previous) => {
  const calculation = (current / previous - 1) * 100
  return calculation.toFixed(2).concat("%")
}

const formatCurrentPrice = (current) => {
  return Number.parseFloat(current.toString().padEnd(3, "0")).toFixed(2) // Ensure API data returns in proper monetary type
}

const formatQuoteDifference = (current, previous) => {
  const calculation = current - previous
  return calculation.toFixed(2)
}

const TickerItem = ({ quote }) => {
  const [marketData, setMarketData] = useState({
    current: 0,
    previous: 0,
    isNegative: false,
    didPriceFall: null,
  })

  useEffect(() => {
    // Todo: Check if using a useEffect is necessary to grab data. Just in case.
    const timer = setInterval(() => {
      fetch(
        `https://finnhub.io/api/v1/quote?symbol=${quote}&token=${process.env.REACT_APP_FINHUB_API_KEY}`
      )
        .then((res) => res.json())
        .then((res) =>
          setMarketData((prev) => {
            return {
              current: res.c,
              previous: res.pc,
              isNegative: res.c - res.pc < 0 ? true : false,
              didPriceFall: prev.current > res.c ? true : false, // Checks to see if the market moved up/down based on previous fetch
            }
          })
        )
        .catch((err) => console.log(err))
      console.log("ticked")
    }, 10000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const elements = document.getElementById("market-quote").classList // removing color change after a brief flash. This doesn't work.

    const removeClassList = () => {
      elements.remove("text-red-600", "text-green-600") // If item not in classList, then this does nothing.
    }
    setTimeout(removeClassList, 500)

    return () => clearTimeout(removeClassList)
  }, [marketData])

  return (
    <div className="block w-64 h-20 text-sm px-5 py-3 flex flex-col space-y-1 bg-gray-100 border-r-2 border-gray-200 hover:bg-gray-200">
      <div className="space-x-2 flex justify-between">
        <span className="font-bold">{quote} - Nasdaq</span>
        <span
          id="market-quote"
          className={`${
            marketData.didPriceFall === null
              ? ""
              : marketData.didPriceFall
              ? "text-red-600"
              : "text-green-600"
          }`}
        >
          {formatCurrentPrice(marketData.current)}
        </span>
      </div>
      <div
        className={`space-x-2 ${
          marketData.isNegative ? "text-red-700" : "text-green-700"
        }`}
      >
        <span className="inline-flex">
          {marketData.isNegative ? (
            <svg
              id="Negative"
              enableBackground="new 0 0 515.556 515.556"
              height="8"
              viewBox="0 0 515.556 515.556"
              width="12"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="currentColor"
                d="m257.778 386.671-257.778-257.778h128.886l128.892 128.889 128.886-128.897 128.892.008z"
              />
            </svg>
          ) : (
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
          )}
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
