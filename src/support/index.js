let access_token = ""

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

export const generateAccessToken = (refresh_token) => {
  const body = `grant_type=refresh_token&refresh_token=${encodeURIComponent(
    process.env.REACT_APP_REFRESH_TOKEN
  )}&access_type=&code=&client_id=${encodeURIComponent(
    process.env.REACT_APP_API_KEY
  )}&refresh_uri=`
  fetch("https://api.tdameritrade.com/v1/oauth2/token", {
    method: "POST",
    headers: {
      "Content-type": "application/x-www-form-urlencoded",
    },
    body: body,
  })
    .then((res) => res.json())
    .then((res) => (access_token = res.access_token))
    .catch((err) => console.log(err))
}

export const getAccessToken = () => {
  return access_token
}
