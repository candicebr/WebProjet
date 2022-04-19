const api_key = 'e49df607b7784b9284a6224a821742cd';
const baseUrl = 'https://holidays.abstractapi.com/v1';
const year = 2020;
const country = 'US';

const getHolidayData =
    async function() {
  const response = await fetch(
      baseUrl + '/?api_key=' + api_key + '&country=' + country +
      '&year=' + year)
  if (response.status == 200) {
    return response.json()
  }
  else {
    new Error(response.statusText)
  }
}

export {
  getHolidayData
}