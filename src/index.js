import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import "./tailwind.output.css"
import Header from "./components/Header"
import Ticker from "./components/Ticker"
import Content from "./components/Content"
import { generateAccessToken, getAccessToken } from "./support"

const App = () => {
  const [chartData, setChartData] = useState([])

  const queryResultCallback = (ticker) => {
    fetch(
      `https://api.tdameritrade.com/v1/marketdata/${ticker}/pricehistory?periodType=month&period=6&frequencyType=daily&frequency=1&needExtendedHoursData=false`,
      {
        headers: new Headers({
          Authorization: `Bearer ${getAccessToken()}`,
        }),
      }
    )
      .then((res) => res.json())
      .then((res) => setChartData(res))
  }

  const tickerResultCallback = (ticker) => {
    fetch(
      `https://api.tdameritrade.com/v1/marketdata/${ticker}/pricehistory?periodType=month&period=6&frequencyType=daily&frequency=1&needExtendedHoursData=false`,
      {
        headers: new Headers({
          Authorization: `Bearer ${getAccessToken()}`,
        }),
      }
    )
      .then((res) => res.json())
      .then((res) => setChartData(res))
  }

  useEffect(() => {
    generateAccessToken()
    getAccessToken()
  }, [])

  return (
    <div>
      <Header queryResultCallBack={queryResultCallback} />
      <Ticker tickerResultCallBack={tickerResultCallback} />
      <Content chartData={chartData} />
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
)
