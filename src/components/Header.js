import React, { useEffect, useRef, useState } from "react"
import QueryResult from "./QueryResult"
import _ from "lodash"

const Header = () => {
  const [itemQuery, setItemQuery] = useState("")
  const [stockList, setStocklist] = useState([])
  const searchElement = useRef(null)

  useEffect(() => {
    window.addEventListener("keydown", (e) => globalFocusToSearch(e))

    fetch(
      `https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${process.env.REACT_APP_FINHUB_API_KEY}`
    )
      .then((res) => res.json())
      .then((res) => {
        const filteredRes = res.filter((item) => item.description !== "")
        setStocklist(filteredRes)
      })

    return window.removeEventListener("keydown", (e) => globalFocusToSearch(e))
  }, [])

  const globalFocusToSearch = (element) => {
    if (element.key === "/") {
      searchElement.current.focus() // TODO: Remove the slash after the event is focused.
    }
  }

  const handleInputChange = (e) => {
    setItemQuery(e.target.value)
    // _.debounce(() => {
    //   setItemQuery(e.target.value)
    //   console.log("bounced")
    // }, 150)()
    console.log("input")
  }

  const queryRegex = new RegExp(itemQuery.trim(), "i")
  const stocks = stockList.filter(
    // Very expensive operation TODO Optimize this
    (stockItem) =>
      stockItem.displaySymbol.match(queryRegex) !== null ||
      stockItem.description.match(queryRegex) !== null
  )

  return (
    <div className="w-full flex content-center p-4 px-8 justify-between bg-blue-500">
      <h2 className="text-white text-xl hover:text-white">Trading Platform</h2>
      <span className="relative w-full xl:w-3/4 l:w-1/2">
        <input
          ref={searchElement}
          className="bg-gray-300 rounded w-full p-2"
          placeholder="Search (press / to focus)"
          value={itemQuery}
          onChange={(e) => handleInputChange(e)}
        ></input>
        <div
          style={{ maxHeight: "512px", overflowY: "hidden" }}
          className={`${
            itemQuery.trim() === "" && "hidden"
          } w-full absolute p-4 mt-2 text-black bg-gray-100 rounded box-border border border-gray-600 space-y-1`}
        >
          {stocks.length === 0 ? (
            <h1 className="text-xl text-gray-500 py-4">
              Sorry, No Results Found
            </h1>
          ) : (
            stocks.map((item, index) => <QueryResult key={index} item={item} />)
          )}
        </div>
      </span>
      <button className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-8 rounded">
        <svg
          enableBackground="new 0 0 24 24"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m12 .5c-6.63 0-12 5.28-12 11.792 0 5.211 3.438 9.63 8.205 11.188.6.111.82-.254.82-.567 0-.28-.01-1.022-.015-2.005-3.338.711-4.042-1.582-4.042-1.582-.546-1.361-1.335-1.725-1.335-1.725-1.087-.731.084-.716.084-.716 1.205.082 1.838 1.215 1.838 1.215 1.07 1.803 2.809 1.282 3.495.981.108-.763.417-1.282.76-1.577-2.665-.295-5.466-1.309-5.466-5.827 0-1.287.465-2.339 1.235-3.164-.135-.298-.54-1.497.105-3.121 0 0 1.005-.316 3.3 1.209.96-.262 1.98-.392 3-.398 1.02.006 2.04.136 3 .398 2.28-1.525 3.285-1.209 3.285-1.209.645 1.624.24 2.823.12 3.121.765.825 1.23 1.877 1.23 3.164 0 4.53-2.805 5.527-5.475 5.817.42.354.81 1.077.81 2.182 0 1.578-.015 2.846-.015 3.229 0 .309.21.678.825.56 4.801-1.548 8.236-5.97 8.236-11.173 0-6.512-5.373-11.792-12-11.792z"
            fill="currentColor"
          />
        </svg>
      </button>
    </div>
  )
}

export default Header
