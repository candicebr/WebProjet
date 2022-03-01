const getHolidayData =
    async function() {
  const response = await fetch(
      'https://holidays.abstractapi.com/v1/?api_key=e49df607b7784b9284a6224a821742cd&country=US&year=2020')
  if (response.status == 200) {
    // return response.json()
    console.log(await response.json())
  }
  else {
    new Error(response.statusText)
  }
}

export {
  getHolidayData
}