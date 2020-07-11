import React from "react"
import TickerItem from "./TickerItem"

const Ticker = () => {
  return (
    <div className="flex rounded border-gray-400 shadow-xl ">
      <TickerItem quote="AAPL" />
      <TickerItem quote="NFLX" />
      <TickerItem quote="SPOT" />
      <TickerItem quote="TSLA" />
      <TickerItem quote="TWTR" />
    </div>
  )
}

export default Ticker
