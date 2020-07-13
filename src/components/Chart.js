import React, { useState, useEffect } from "react"
import * as d3 from "d3"

const width = 650
const height = 400
const margin = { top: 20, right: 5, bottom: 20, left: 35 }
const red = "#eb6a5b"
const green = "#b6e86f"

const Chart = () => {
  //   const [state, setState] = useState({
  //     highs: null,
  //     lows: null,
  //   })
  //   const xScale = d3.scaleTime().range([margin.left, width - margin.right])
  //   const yScale = d3.scaleLinear().range([0, width / 2])
  //   const xAxis = d3.axisBottom().scale(xScale).tickFormat(d3.timeFormat("%b"))
  //   const yAxis = d3
  //     .axisLeft()
  //     .scale(yScale)
  //     .tickFormat((d) => `${d}$`)
  //   const lineGenerator = d3.line()

  //   useEffect(() => {
  //     const data = JSON.parse(localStorage.getItem("AAPL"))

  //     console.log(data)
  // Update Scales
  // const timeDomain = d3.extent(data, (d) => d.date)
  // const tempMax = d3.max(data, (d) => d.open)
  // xScale.domain(timeDomain)
  // yScale.domain([0, tempMax])

  // //Line Generate
  // lineGenerator.x((d) => xScale(d.date))
  // lineGenerator.y((d) => yScale(d.high))
  // const highs = lineGenerator(data)
  // setState({ highs })
  //   }, [])
  const calculatedPath = d3.line()([
    [10, 60],
    [40, 90],
    [60, 10],
    [190, 10],
  ])

  return (
    <div>
      {/* <svg width={width} height={height}>
        <path d={state.highs} fill="none" stroke={red} />
      </svg> */}
      <svg width={width} height={height}>
        <path d={calculatedPath} fill="none" stroke={red} />
      </svg>
    </div>
  )
}

export default Chart
