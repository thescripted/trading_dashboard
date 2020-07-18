let access_token =
  "FTcttrPQqHv7JXp1vJtyadxoistytckcgR1LETjN2xj7Rsj1GDRwQGd6ex7Jw9Zb0yV9ZxTdm/BxdpZH9nQ+U91CMOUIvkpKdNIjOBduDlekNmVI82D2tG5tUli54a43zDfuTaDudRS1UDUEBpfgFEL075J7K2bHGLngj72JUWjG7I7opxmGLDe3hJB/cdPFShJXOcfmlr7jXYy2IzupBDC9fdVnqZ1PtiqB4VsCYKvYJefynv0INjkC0aTYrDZPwZzWLNNekY9BlIiPrP3/C6A6BzUhbnrX3LIMlcDrT9qPq9V+c30Spd6WyBiPSRGgqXNret5Tox43pZJir03pPxdjA0u0w9el4VM2CS8Crss730aJUADbIyvEyxiAJq1KrnIjJWNvmu9vCEApUf7IHs0PkFwVssNpyDed6HKzakTeERNJX1MguO+eMV0SGy8D4TezCeChQTHDvBkQBHdyLFh6IPkBhKEiJvhz88rSj6Hv9WlnDwLoc3e9+CzYjkZ7WrE63u2MiQ/NUqaqFH54k/9MmYosGZSRnTCcR3bxZxyyZFukl100MQuG4LYrgoVi/JHHvlgXeUN6THa+Q4l//ZDlmQr6NU7lDCOWEwxp2Z/uC5FAiLo3R5gV7x/Z55euW1J6W0QOfXcwPLtzHQrkLRyBZki1tG4/CZwOQj9orxCMvZrrOSL/g5PHI6g3NZ24si72tD76wEub1g4CTZ4E8Ndwiv086zIpp0kSxuePiBmJ+zESYAGXCqInZTk2NpYLyFVNnTPPUj0xBXeeYXZYLkHeMZ6Yg5t6mtPw88F5+mEBWwxppb8ax10Z/8X+gHuRgHEvMD+7CMZeupvytucRftSSH0UDnXVuWs6jegf/3pFV1iKfAZeY9A3KE/4gUwC0UGUdLi5dFo0cTQLGd22KsxK92s1kcQk60beJI1H3YhztUIDxpc5CID1gHaJSKiM5A+HLoldFTkvneJTOH+KrFmFLeJw8C4r4o3nkgmK2k9W4gEJyGrwoODXj91y7MckxspZPcrBEJJf0F00SceXiMsgwSWT9GM7NpOLutGoaIJvpN9JayMzKBX0KL+oiEQUmuISX8TyRM9XxrhSugInnvIaHEznYbTsiMBXWLEJ6Nnm7prOwrwCv+A==212FD3x19z9sWBHDJACbC00B75E"

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
