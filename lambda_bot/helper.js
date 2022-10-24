const axios = require('axios').default;
const retry = require('retry');
const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

const currentTime = dayjs().subtract(7, 'h');
const tripStart = dayjs('2022-12-30 00:00');
const tripHasStarted = dayjs().isBefore(tripStart);
const daysLeft = tripStart.diff(currentTime, 'days') + 1;

const daysAndWeeksLeft = () => {
  const weeks = Math.floor(daysLeft / 7);
  const days = daysLeft % 7;
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

// set up retry config
const operation = retry.operation({
  retries: 3,
  factor: 3,
  minTimeout: 1 * 1000,
  maxTimeout: 60 * 1000,
  randomize: true,
});

const currentExchangeRate = async () => {
  operation.attempt(async (currentAttempt) => {
    console.log('sending request: ', currentAttempt, ' attempt');
    try {
      const url = 'https://api.exchangerate.host/convert?from=USD&to=JPY';
      const response = await axios.get(url)
      const USDtoJPY = response.data.result
      return `1 USD = ${USDtoJPY.toFixed(2)} JPY`
    } catch (e) {
      if (operation.retry(e)) { return; }
    }
  });
}

module.exports = {
  daysAndWeeksLeft,
  countDown,
  currentExchangeRate
}