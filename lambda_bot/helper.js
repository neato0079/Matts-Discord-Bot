const axios = require('axios').default;
const axiosRetry = require('axios-retry');
const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

const currentTime = dayjs().subtract(7, 'h');
const tripStart = dayjs('2022-12-30 00:00');
const tripHasStarted = dayjs().isBefore(tripStart);
const daysLeft = tripStart.diff(currentTime, 'days') + 1;

const daysAndWeeksLeft = (defaultDays = daysLeft) => {
  const weeks = Math.floor(defaultDays / 7);
  const days = defaultDays % 7;
  if (days === 0) {
    return `${weeks} week(s) left until fly me to Japan!`
  }
  return `${weeks} week(s) and ${days} day(s) left until fly me to Japan!`
}

const countDown = () => {
  if (!tripHasStarted) {
    return 'Count down finished'
  };
  return `Current date: ${currentTime.format('MM/DD/YYYY HH:mm')} \n${daysLeft} day(s) left until Japan trip!`

}

const currentExchangeRate = async () => {
  axiosRetry(axios, { retries: 2 });
  const url = 'https://api.exchangerate.host/convert?from=USD&to=JPY';
  // const response = await axios.get(url)
  // const response = await axios.get('https://no-such-server.blabla')
  const response = await axios.get('http://webcode.me')
  // console.log(response.status)
  return 'response'
  // const USDtoJPY = response.data.result
  // return `1 USD = ${USDtoJPY.toFixed(2)} JPY`

  // });
  }

currentExchangeRate()

module.exports = {
  daysAndWeeksLeft,
  countDown,
  currentExchangeRate
}