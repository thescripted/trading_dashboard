import React, { useState, useEffect } from "react"
import {
  formatQuoteDifference,
  formatQuotePercentage,
  formatCurrentPrice,
} from "../support/"

const TickerItem = ({ quote, description, onClick, className }) => {
  const [color, setColor] = useState(null)
  const [marketData, setMarketData] = useState({
    current: 0,
    previous: 0,
    isNegative: false,
    didPriceFall: null,
  })

  const flashMoneyDirection = () => {
    if (marketData.didPriceFall) setColor("red")
    else setColor("green")
    setTimeout(() => {
      setColor(null)
    }, 350)
  }

  const fetcher = () =>
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

  useEffect(() => {
    if (!marketData.current) {
      fetcher()
    }
    const timer = setInterval(() => {
      fetcher()
      flashMoneyDirection()
    }, 12000)
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
    <div
      className={`${className} block w-64 text-sm px-3 py-2 flex flex-col space-y-1 bg-gray-100 border-r-2 border-gray-200 hover:bg-gray-200`}
      onClick={() => onClick(quote)}
    >
      <div className="space-x-2 flex justify-between">
        <div className="flex flex-col ">
          <p className="font-bold">{quote}</p>
          <p>{description}</p>
        </div>
        <span
          id="market-quote"
          className={`${
            color === "green"
              ? "text-green-600"
              : color === "red"
              ? "text-red-600"
              : ""
          }`}
        >
          {formatCurrentPrice(marketData.current)}
        </span>
      </div>
      <div
        className={`whitespace-no-wrap ${
          marketData.isNegative ? "text-red-700" : "text-green-700"
        }`}
      >
        <span className="text-xl sm:text-2xl font-bold mr-1">
          {formatQuotePercentage(marketData.current, marketData.previous)}
        </span>
        <span>
          {formatQuoteDifference(marketData.current, marketData.previous)}
        </span>
        <span className="ml-3 inline-flex">
          {marketData.isNegative ? (
            <svg
              id="Negative"
              enableBackground="new 0 0 515.556 515.556"
              height="12"
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
              id="Capa_1"
              enableBackground="new 0 0 515.556 515.556"
              height="12"
              viewBox="0 0 515.556 515.556"
              width="12"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="currentColor"
                d="m257.778 128.885 257.778 257.778h-128.886l-128.892-128.889-128.886 128.897-128.892-.008z"
              />
            </svg>
          )}
        </span>
      </div>
    </div>
  )
}

export default TickerItem
