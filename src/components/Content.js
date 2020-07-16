import React, { useEffect, useState } from "react"
import Chart from "./Chart"
import DetailedQuote from "./DetailedQuote"
const Content = () => {
  const [candles, setCandles] = useState([])
  // useEffect(() => {
  //   fetch(
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
  return (
    <div
      style={{ height: "480px" }}
      className="flex justify-center items-center space-x-2 w-full mt-4 mx-auto bg-white shadow-md rounded"
    >
      {/* <h1 className="m-0 text-gray-500 text-2xl">
        Use the Navigation Above to Select a Stock
      </h1> */}
      {/* {candles.length !== 0 && <Chart candles={candles} />} */}
      <DetailedQuote />
      <Chart candles={candles} />
    </div>
  )
}

export default Content
