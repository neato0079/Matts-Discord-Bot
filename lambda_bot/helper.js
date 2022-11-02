const axios = require('axios').default;
// const axiosRetry = require('axios-retry');
// const retry = require('retry')
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
    return `${weeks} week(s) left until fly me to Japan!`;
  }
  return `${weeks} week(s) and ${days} day(s) left until fly me to Japan!`;
}

const countDown = () => {
  if (!tripHasStarted) {
    return 'Count down finished';
  };
  return `Current date: ${currentTime.format('MM/DD/YYYY HH:mm')} \n${daysLeft} day(s) left until Japan trip!`;

}

const currentExchangeRate = async () => {

  const url = 'https://api.exchangerate.host/convert?from=USD&to=JPY';

  return new Promise((resolve, reject) => {
    let NumberOfRetries = 3;
    const retry = () => {
      axios.get(url)
        .then((response) => {
          if(response.status !== 200) {
            return reject(`BAD DATA! Received status code: ${response.status}\nData:${response.data}`);
          }
          const USDtoJPY = response.data.result;
          // console.log(`1 USD = ${USDtoJPY.toFixed(2)} JPY`)
          // console.log(response.status)
          resolve(`1 USD = ${USDtoJPY.toFixed(2)} JPY`);
        })
        .catch((error) => {
          --NumberOfRetries;
          if (NumberOfRetries > 0) {
            console.log(`Retrying...`)
            retry();
          } else {
            reject(error);
          }
        })
    }
    retry();
  })
};

// console.log(currentExchangeRate());

module.exports = {
  daysAndWeeksLeft,
  countDown,
  currentExchangeRate
}