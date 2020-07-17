import React, { useEffect, useState } from "react"
import Chart from "./Chart"
import DetailedQuote from "./DetailedQuote"
const Content = ({ chartData }) => {
  const [isData, setIsData] = useState(false)
  useEffect(() => {
    if (chartData.candles && chartData.candles.length) {
      setIsData(true)
    }
  }, [chartData.candles])
  // useEffect(() => { //   fetch(
  //     "https://api.tdameritrade.com/v1/marketdata/NFLX/pricehistory?periodType=month&period=6&frequencyType=daily&frequency=1&needExtendedHoursData=false",
  //     {
  //       headers: new Headers({
  //         Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
  //       }),
  //     }
  //   )
  //     .then((res) => res.json())
  //     .then((res) => setCandles(res.candles))
  // }, [])
  // localStorage.setItem("NFLX", JSON.stringify(candles))
  // const data = JSON.parse(localStorage.getItem("NFLX"))
  return (
    <div
      style={{ height: "480px" }}
      className="flex justify-center items-center w-full mt-4 mx-auto bg-white shadow-md rounded p-2"
    >
      {!isData && (
        <h1 className="m-0 text-gray-500 text-2xl">
          Use the Navigation Above to Select a Stock
        </h1>
      )}
      {isData && <DetailedQuote tickerToFetch={chartData.symbol} />}
      {isData && <Chart key={chartData.symbol} data={chartData.candles} />}
    </div>
  )
}

export default Content
