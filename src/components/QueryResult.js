import React from "react"

const QueryResult = ({ item }) => {
  return (
    <div className="w-full p-2 hover:bg-gray-300 rounded flex flex-col">
      <span className="inline-flex justify-between">
        <h2 className="text-xl">{item.displaySymbol}</h2>
        <h2 className="text-xl">317.59</h2>
      </span>
      <span className="inline-flex justify-between">
        <p className="text-sm">{item.description}</p>
        <p className="text-sm text-green-500">
          Something something wlil go here as well.
        </p>
      </span>
    </div>
  )
}

export default QueryResult
