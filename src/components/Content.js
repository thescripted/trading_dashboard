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
      style={{ minHeight: "450px" }}
      className="flex flex-col md:flex-row justify-center items-center w-full mt-4 mx-auto bg-white shadow-lg rounded p-2"
    >
      {!isData && (
        <h1 className="m-0 text-center text-gray-500 text-xl sm:text-2xl p-2">
          Use the Navigation Above to Select a Stock
        </h1>
      )}
      {isData && <DetailedQuote tickerToFetch={chartData.symbol} />}
      {isData && <Chart key={chartData.symbol} data={chartData.candles} />}
    </div>
  )
}

export default Content
