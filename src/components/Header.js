import React, { useCallback, useReducer, useEffect, useRef } from "react"
import QueryResult from "./QueryResult"

const debounce = (fn, delay) => {
  let timeoutId
  return function (...args) {
    clearInterval(timeoutId)
    timeoutId = setTimeout(() => fn.apply(this, args), delay)
  }
}

const initialState = {
  userInput: "",
  debouncedQuery: "",
  listOfStocks: [],
  queryStockResults: [],
  isDropdown: false,
}

function reducer(state, action) {
  switch (action.type) {
    case "SET_USER_INPUT":
      return { ...state, userInput: action.value }
    case "SET_DEBOUNCE_QUERY":
      return { ...state, debouncedQuery: action.value }
    case "INITIALIZE_STOCK":
      return { ...state, listOfStocks: action.value }
    case "FILTER_STOCK_FROM_DEBOUNCED_QUERY": {
      return { ...state, queryStockResults: action.value }
    }
    case "DISPLAY_SEARCH_RESULTS": {
      return { ...state, isDropdown: action.value }
    }
    default:
      throw new Error()
  }
}

const Header = ({ queryResultCallBack }) => {
  const wrapperRef = useRef(null)
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        dispatch({ type: "DISPLAY_SEARCH_RESULTS", value: false })
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [wrapperRef])

  const debounceCallBack = useCallback(
    debounce((value) => {
      dispatch({ type: "SET_DEBOUNCE_QUERY", value: value })
    }, 300),
    []
  )

  useEffect(() => {
    if (!state.listOfStocks || !state.listOfStocks.length) {
      let filteredStock
      fetch(
        `https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${process.env.REACT_APP_FINHUB_API_KEY}`
      )
        .then((res) => res.json())
        .then((res) => {
          filteredStock = res.filter((item) => item.description !== "")
          dispatch({ type: "INITIALIZE_STOCK", value: filteredStock })
        })
    }
  }, [])

  useEffect(() => {
    let queryRegex = new RegExp(state.debouncedQuery.trim(), "i") // TODO: Expand this search Regex
    let filter = state.listOfStocks.filter(
      (stockItem) =>
        stockItem.displaySymbol.match(queryRegex) !== null ||
        stockItem.description.match(queryRegex) !== null
    )
    dispatch({ type: "FILTER_STOCK_FROM_DEBOUNCED_QUERY", value: filter })
  }, [state.debouncedQuery])

  const onInputChangeHandler = ({ target: { value } }) => {
    dispatch({ type: "SET_USER_INPUT", value: value })
    debounceCallBack(value) // This will get fired many times but debounce function will control/"throttle" it's execution
  }

  const handleData = (item) => {
    queryResultCallBack(item.displaySymbol)
  }
  return (
    <div className="flex flex-row content-center p-4 px-8 justify-between bg-blue-500">
      <a href="/" className="pointer">
        <h2 className="text-white text-xl hover:text-white self-center">
          Trading Analytics
        </h2>
      </a>
      <span className="relative w-full xl:w-3/4 l:w-1/2">
        <input
          className="bg-gray-300 rounded w-full p-2"
          placeholder="Search (press / to focus)"
          value={state.userInput}
          onClick={() => {
            dispatch({ type: "DISPLAY_SEARCH_RESULTS", value: true })
          }}
          onChange={onInputChangeHandler}
        ></input>
        {state.isDropdown && (
          <div
            ref={wrapperRef}
            style={{ maxHeight: "512px", overflowY: "hidden" }}
            id="search_result"
            className={`${
              state.userInput.trim() === "" && "hidden"
            } w-full absolute p-4 mt-2 text-black bg-gray-100 rounded box-border border border-gray-600 space-y-1`}
          >
            {state.queryStockResults.length === 0 ? (
              <h1 className="text-xl text-gray-500 py-4">
                Sorry, No Results Found
              </h1>
            ) : (
              state.queryStockResults
                .slice(0, 10)
                .map((item, index) => (
                  <QueryResult key={index} item={item} onClick={handleData} />
                ))
            )}
          </div>
        )}
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
