import React, { useEffect, useState } from "react"
import {
  formatCurrentPrice,
  formatPercentage,
  formatDifference,
  getAccessToken,
} from "../support/index"

const QueryResult = ({ item, onClick }) => {
  const [response, setResponse] = useState([])
  useEffect(() => {
    fetch(`https://api.tdameritrade.com/v1/marketdata/${item.symbol}/quotes`, {
      headers: new Headers({
        Authorization: `Bearer ${getAccessToken()}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => setResponse(data[item.symbol]))
  }, [item])

  const { mark, markChangeInDouble, markPercentChangeInDouble } = response
  return (
    <div
      className="w-full p-2 hover:bg-gray-300 rounded flex flex-col"
      onClick={() => onClick(item)}
    >
      {response.mark && (
        <>
          <span className="inline-flex justify-between">
            <h2 className="text-l sm:text-xl">{item.displaySymbol}</h2>
            <h2 className="text-l sm:text-xl">{formatCurrentPrice(mark)}</h2>
          </span>
          <span className="inline-flex justify-between">
            <p className="text-xs sm:text-sm">{item.description}</p>
            <p
              className={`text-xs sm:text-sm ${
                markChangeInDouble > 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {formatDifference(markChangeInDouble)} (
              {formatPercentage(markPercentChangeInDouble)})
            </p>
          </span>
        </>
      )}
    </div>
  )
}

export default QueryResult
