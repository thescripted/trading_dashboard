import React from "react"
import TickerItem from "./TickerItem"

const Ticker = ({ tickerResultCallBack }) => {
  return (
    <div className="flex rounded border-gray-400 shadow-xl ">
      <TickerItem
        quote="AAPL"
        description="Apple Inc."
        onClick={tickerResultCallBack}
      />
      <TickerItem
        quote="NFLX"
        description="Netflix, Inc."
        onClick={tickerResultCallBack}
      />
      <TickerItem
        quote="SPOT"
        description="Spotify Technology"
        onClick={tickerResultCallBack}
      />
      <TickerItem
        quote="TSLA"
        description="Tesla, Inc."
        onClick={tickerResultCallBack}
      />
      <TickerItem
        quote="TWTR"
        description="Twitter, Inc."
        onClick={tickerResultCallBack}
      />
    </div>
  )
}

export default Ticker
