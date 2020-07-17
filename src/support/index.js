export const formatQuotePercentage = (current, previous) => {
  const calculation = (current / previous - 1) * 100
  return calculation.toFixed(2).concat("%")
}

export const formatCurrentPrice = (current) => {
  return Number.parseFloat(current.toString().padEnd(3, "0")).toFixed(2) // Ensure API data returns in proper monetary type
}

export const formatQuoteDifference = (current, previous) => {
  const calculation = current - previous
  return calculation.toFixed(2)
}

export const formatPercentage = (percentChange) => {
  return percentChange.toFixed(2).concat("%")
}

export const formatDifference = (difference) => {
  return difference.toFixed(2)
}
