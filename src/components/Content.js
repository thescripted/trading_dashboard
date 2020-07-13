import React, { useEffect } from "react"
import Chart from "./Chart"

const Content = () => {
  // useEffect(() => {
  //   fetch("https://api.tdameritrade.com/v1/marketdata/AAPL/pricehistory", {
  //     headers: new Headers({
  //       Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((res) => localStorage.setItem("AAPL", JSON.stringify(res)))
  // }, [])

  // useEffect( () => {
  //   const postBody = {
  //     grant_type: "refresh_token",
  //     refresh_token: process.env.REACT_APP_REFRESH_TOKEN,
  //     client_id: process.env.REACT_APP_API_KEY
  //   }
  //   fetch("https://api.tdameritrade.com/v1/oauth2/token", {
  //     method: 'POST',
  //     body: JSON.stringify(postBody)
  //   }).then(res => res.json()).then(res => console.log(res))
  // })

  return (
    <div
      style={{ height: "480px" }}
      className="flex justify-center items-center space-x-2 w-full mt-4 mx-auto bg-white shadow-md rounded"
    >
      {/* <h1 className="m-0 text-gray-500 text-2xl">
        Use the Navigation Above to Select a Stock
      </h1> */}
      <Chart />
    </div>
  )
}

export default Content
