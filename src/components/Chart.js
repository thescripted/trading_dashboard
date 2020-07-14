import React, { useRef, useEffect } from "react"
import * as d3 from "d3"

const margin = { top: 20, right: 5, bottom: 20, left: 35 }
const width = 650 - margin.left - margin.right
const height = 400 - margin.top - margin.bottom
const red = "#eb6a5b"
const green = "#b6e86f"

const Chart = () => {
  const candles = JSON.parse(localStorage.getItem("NFLX"))
  console.log(candles)
  candles.map((candle) => (candle.datetime = new Date(candle.datetime))) // turn UNIX into Date Type
  const xRef = useRef(null)
  const yRef = useRef(null)
  const mainRef = useRef(null)

  const newX = d3
    .scaleBand()
    .domain(
      d3.utcDay.range(
        candles[0].datetime,
        +candles[candles.length - 1].datetime + 1
      )
      // .filter((d) => d.getUTCDay() !== 0 && d.getUTCDay() !== 6)
    )
    .range([0, width])
    .padding(0.2)

  const newY = d3
    .scaleLinear()
    .domain([d3.min(candles, (d) => d.low), d3.max(candles, (d) => d.high)])
    .rangeRound([height, 0])

  const x = d3
    .scaleTime()
    .domain(d3.extent(candles, (d) => d.datetime))
    .nice()
    .range([0, width])

  const y = d3
    .scaleLinear()
    .domain([340, d3.max(candles, (d) => d.open)])
    .nice()
    .range([height, 0])

  const lineGenerator = d3
    .line()
    .x((d) => x(d.datetime))
    .y((d) => y(d.open))
  const pricePath = lineGenerator(candles)

  useEffect(() => {
    d3.select(xRef.current)
      .call(
        d3
          .axisBottom(newX)
          .tickValues(
            d3.utcMonday
              .every(width > 720 ? 1 : 2)
              .range(candles[0].datetime, candles[candles.length - 1].datetime)
          )
          .tickFormat(d3.utcFormat("%-m/%-d"))
      )
      .select(".domain")
      .remove()

    d3.select(yRef.current)
      .call(
        d3
          .axisLeft(newY)
          .tickFormat(d3.format("$~f"))
          .tickValues(d3.scaleLinear().domain(newY.domain()).ticks())
      )
      .select(".domain")
      .remove()

    const g = d3
      .select(mainRef.current)
      .append("g") // Unsafe as now D3 and React are manipulating the DOM. I don't know how to do this any other way at the moment.
      .attr("stroke-linecap", "round")
      .attr("stroke", "black")
      .selectAll("g")
      .data(candles)
      .join("g")

    g.append("line")
      .attr("y1", (d) => newY(d.open))
      .attr("y2", (d) => newY(d.close))
      .attr("stroke-width", newX.bandwidth())
      .attr("stroke", (d) =>
        d.open > d.close
          ? d3.schemeSet1[0]
          : d.close > d.open
          ? d3.schemeSet1[2]
          : d3.schemeSet1[8]
      )
    // .attr("transform", (d) => `translate(${newX(candles[0].datetime)}, 0)`)
    // g.append("line") // Unsafe as now D3 and React are manipulating the DOM. I don't know how to do this any other way at the moment.
    //   .attr("y1", (d) => newY(d.low))
    //   .attr("y2", (d) => newY(d.high))
    // .append("line")
    // .data(candles)
    // .attr("y1", (d) => d.low)
    // .attr("y2", (d) => d.high)
  }, [])
  return (
    <svg
      width={width + margin.left + margin.right}
      height={height + margin.top + margin.bottom}
    >
      <path d={pricePath} fill="none" stroke={red}></path>
      <g ref={mainRef} transform={`translate(${margin.left}, ${margin.top})`}>
        <g ref={xRef} transform={`translate(0, ${height})`}></g>
        <g ref={yRef}></g>
      </g>
    </svg>
  )
}

export default Chart
