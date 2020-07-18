import React from "react"
import TickerItem from "./TickerItem"

const Ticker = ({ tickerResultCallBack }) => {
  return (
    <div className="flex justify-center rounded border-gray-400 shadow-xl ">
      <TickerItem
        quote="AAPL"
        description="Apple Inc."
        onClick={tickerResultCallBack}
        className=""
      />
      <TickerItem
        quote="NFLX"
        description="Netflix, Inc."
        onClick={tickerResultCallBack}
        className=""
      />
      <TickerItem
        quote="SPOT"
        description="Spotify Technology"
        onClick={tickerResultCallBack}
        className="hidden sm:block"
      />
      <TickerItem
        quote="TSLA"
        description="Tesla, Inc."
        onClick={tickerResultCallBack}
        className="hidden md:block"
      />
      <TickerItem
        quote="TWTR"
        description="Twitter, Inc."
        onClick={tickerResultCallBack}
        className="hidden lg:block"
      />
    </div>
  )
}

export default Ticker
