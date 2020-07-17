import React from "react"
import TickerItem from "./TickerItem"

const Ticker = ({ tickerResultCallBack }) => {
  return (
    <div className="flex rounded border-gray-400 shadow-xl ">
      <TickerItem quote="AAPL" onClick={tickerResultCallBack} />
      <TickerItem quote="NFLX" onClick={tickerResultCallBack} />
      <TickerItem quote="SPOT" onClick={tickerResultCallBack} />
      <TickerItem quote="TSLA" onClick={tickerResultCallBack} />
      <TickerItem quote="TWTR" onClick={tickerResultCallBack} />
    </div>
  )
}

export default Ticker
