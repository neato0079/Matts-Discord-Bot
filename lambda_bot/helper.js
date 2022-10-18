const axios = require('axios').default;
const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

const currentTime = dayjs().subtract(7, 'h');
const tripStart = dayjs('2022-12-30 00:00');
const tripHasStarted = dayjs().isBefore(tripStart);
const daysLeft = tripStart.diff(currentTime, 'days') + 1;

// console.log(`Current date/time: ${currentTime.format('MM/DD/YYYY HH:mm')}`)
// console.log('Trip start:', tripStart.format('MM/DD/YYYY HH:mm'))

const daysAndWeeksLeft = () => {
  const weeks = Math.floor(daysLeft / 7);
  const days = daysLeft % 7;
  if (days === 0) {
    return `${weeks} week(s) left until fly me to Japan!`
  }
  return `${weeks} week(s) and ${days} day(s) left until fly me to Japan!`
}

// console.log(daysAndWeeksLeft())

const countDown = () => {
  if (!tripHasStarted) {
    return 'Count down finished'
  };
  return `Current date: ${currentTime.format('MM/DD/YYYY HH:mm')} \n${daysLeft} day(s) left until Japan trip!`

}

// console.log(countDown())

const currentExchangeRate = async () => {
  // get it from an API and return it lol
  const url = 'https://api.exchangerate.host/convert?from=USD&to=JPY';
  const exchangeRateConfig = {
    base: 'USD'
  }
  const response = await axios.get(url)
  return response.data.result
}

module.exports = {
  daysAndWeeksLeft,
  countDown,
  currentExchangeRate
}