import React, { useRef, useEffect } from "react"
import * as d3 from "d3"

const height = 450
const width = 900
const margin = { top: 40, right: 60, bottom: 80, left: 80 }
const formatDate = d3.utcFormat("%B %-d, %Y")
const formatValue = d3.format("$.2f")
const formatChange = (y0, y1) => {
  const f = d3.format("+.2%")
  return f((y1 - y0) / y0)
}

// const data = JSON.parse(localStorage.getItem("NFLX")).slice(-90)

const Chart = ({ data }) => {
  data = data.slice(-90)
  const svgElement = useRef(null)

  const xAxis = (g) =>
    g
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(
        d3
          .axisBottom(x)
          .tickValues(
            d3.utcMonday
              .every(width > 720 ? 1 : 2)
              .range(data[0].datetime, data[data.length - 1].datetime)
          )
          .tickFormat(d3.utcFormat("%-m/%-d"))
      )
      .call((g) => g.select(".domain").remove())

  const yAxis = (g) =>
    g
      .attr("transform", `translate(${margin.left},0)`)
      .call(
        d3
          .axisLeft(y)
          .tickFormat(d3.format("$~f"))
          .tickValues(d3.scaleLinear().domain(y.domain()).ticks())
      )
      .call((g) =>
        g
          .selectAll(".tick line")
          .clone()
          .attr("stroke-opacity", 0.1)
          .attr("x2", width - margin.left - margin.right)
      )
      .call((g) => g.select(".domain").remove())

  const x = d3
    .scaleBand()
    .domain(
      d3.utcDay
        .range(data[0].datetime - 86400000, +data[data.length - 1].datetime) // the 86400000 is 1 day in UNIX millisecond
        .filter((d) => d.getUTCDay() !== 0 && d.getUTCDay() !== 6) // Filter out weekends when markets are close
    )
    .range([margin.left, width - margin.right])
    .padding(0.1)

  console.log(data[0].datetime)
  console.log(data[1].datetime)
  console.log(d3.utcDay(data[0].datetime))
  console.log(x(d3.utcDay(data[0].datetime)))

  const y = d3
    .scaleLinear()
    .domain([d3.min(data, (d) => d.low), d3.max(data, (d) => d.high)])
    .rangeRound([height - margin.bottom, margin.top])

  // linetip.style("display", null).attr("d", function () {
  //   let d = "M" + mouseX + "," + (height - margin.bottom)
  //   d += " " + mouseX + "," + margin.top
  //   return d
  // })
  const lineCallout = (path, value) => {
    if (!value) return path.style("display", "none")

    path
      .style("display", null)
      .attr("d", `M${value},${height - margin.bottom} ${value},${margin.top}`)
  }

  const callout = (g, value) => {
    if (!value) return g.style("display", "none")

    g.style("display", null)
      .style("pointer-events", "none")
      .style("font", "10px sans-serif")

    const path = g
      .selectAll("path")
      .data([null])
      .join("path")
      .attr("fill", "white")
      .attr("stroke", "black")

    const text = g
      .selectAll("text")
      .data([null])
      .join("text")
      .call((text) =>
        text
          .selectAll("tspan")
          .data((value + "").split(/\n/))
          .join("tspan")
          .attr("x", 0)
          .attr("y", (d, i) => `${i * 1.1}em`)
          .style("font-weight", (_, i) => (i ? null : "bold"))
          .text((d) => d)
      )
    const { x, y, width: w, height: h } = text.node().getBBox()

    text.attr("transform", `translate(${-w / 2}, ${15 - y})`)
    path.attr(
      "d",
      `M${-w / 2 - 10}, 5H-5l5,-5l5,5H${w / 2 + 10}v${h + 20}h-${w + 20}z`
    )
  }

  // const lineCallout = (g) => {}

  const bisect = (mx) => {
    const inverter = d3.scaleQuantize().domain(x.range()).range(x.domain())
    const bisector = d3.bisector((d) => d.datetime).left
    const date = inverter(mx)
    const index = bisector(data, date.getTime())
    const b = data[index]
    const value = b
    return { date, value }
  }

  // Generate SVG Image
  useEffect(() => {
    const svg = d3.select(svgElement.current)

    svg.append("g").call(xAxis)
    svg.append("g").call(yAxis)
    const linetip = svg.append("path")
    const g = svg
      .append("g")
      .attr("stroke-linecap", "butt")
      .attr("stroke", "black")
      .selectAll("g")
      .data(data)
      .join("g")
      .attr("transform", (d) => {
        console.log(d)
        return `translate(${x(d3.utcDay(d.datetime))}, 0)`
      })

    g.append("line")
      .attr("y1", (d) => y(d.low))
      .attr("y2", (d) => y(d.high))

    g.append("line")
      .attr("y1", (d) => y(d.open))
      .attr("y2", (d) => y(d.close))
      .attr("stroke-width", x.bandwidth())
      .attr("stroke", (d) =>
        d.open > d.close
          ? d3.schemeSet1[0]
          : d.close > d.open
          ? d3.schemeSet1[2]
          : d3.schemeSet1[8]
      )

    g.append("title").text(
      (d) => `${formatDate(d.datetime)}
    Open: ${formatValue(d.open)}
    Close: ${formatValue(d.close)} (${formatChange(d.open, d.close)})
    Low: ${formatValue(d.low)}
    High: ${formatValue(d.high)}`
    )

    const tooltip = svg.append("g")

    svg.on("touchmove mousemove", function () {
      const mouseX = d3.mouse(this)[0]
      const { date, value } = bisect(mouseX)

      linetip
        .attr("class", "remove")
        .style("stroke", "#000")
        .style("stroke-width", "1px")
        .style("pointer-events", "none")

        .call(lineCallout, mouseX)

      tooltip
        .attr("transform", `translate (${x(date)}, ${y(value.low)})`)
        .call(
          callout,
          `${formatDate(date)}\nOpen: ${formatValue(
            value.open
          )}\nClose: ${formatValue(value.close)} (${formatChange(
            value.open,
            value.close
          )})\nLow: ${formatValue(value.low)}\nHigh: ${formatValue(value.high)}`
        )
    })

    svg.on("touchend mouseleave", () => {
      linetip.call(lineCallout, null)
      tooltip.call(callout, null)
    })
  }, [])

  return (
    <div className="w-3/4 h-full">
      <svg ref={svgElement} viewBox={`0 0 ${width} ${height}`}></svg>
    </div>
  )
}

export default Chart
