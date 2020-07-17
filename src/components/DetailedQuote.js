import React, { useEffect, useState } from "react"

const DetailedQuote = ({ tickerToFetch }) => {
  const [content, setContent] = useState({})
  useEffect(() => {
    fetch(
      `https://api.tdameritrade.com/v1/marketdata/${tickerToFetch}/quotes`,
      {
        headers: new Headers({
          Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
        }),
      }
    )
      .then((res) => res.json())
      .then((res) => setContent(res[tickerToFetch]))
  }, [tickerToFetch])

  window.content = content
  console.log(content)

  const {
    description,
    mark,
    markChangeInDouble,
    markPercentChangeInDouble,
  } = content
  return (
    <div className="flex flex-col space-y-2 flex-grow p-4 self-start">
      {content && (
        <>
          <div className="flex flex-row justify-between text-xl font-bold border-b-2 border-black space-x-1 ">
            <h2>{tickerToFetch}:US</h2>
            <h2 className="font-normal self-end">{description}</h2>
          </div>
          <div className="flex flex-col subheading items-end">
            <span className="flex flex-row items-end space-x-1">
              <h1 className="text-3xl font-bold">{mark}</h1>
              <p className="text-xs mb-1">USD</p>
            </span>
            <div
              className={`flex flex-row ${
                markChangeInDouble > 0 ? "text-green-600" : "text-red-600"
              } space-x-2 text-l`}
            >
              <p>{markChangeInDouble}</p>
              <p> {markPercentChangeInDouble}%</p>
            </div>
            <p className="text-sm text-gray-600">
              Last Updated: Jul 14, 2020 5:13 p.m. EDT
            </p>
          </div>
        </>
      )}
    </div>
  )
}

export default DetailedQuote
