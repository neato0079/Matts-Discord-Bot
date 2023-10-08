require('dotenv').config()
const axios = require('axios').default;
// console.log(`App id: ${process.env.APP_ID}`)
// console.log(`guild id: ${process.env.GUILD_ID}`)
// console.log(`Bot token: ${process.env.BOT_TOKEN}`)
let url = `https://discord.com/api/v8/applications/${process.env.APP_ID}/guilds/${process.env.GUILD_ID}/commands`
//let url = `https://discord.com/api/v10/applications/<my_application_id>/guilds/<guild_id>/commands`

const headers = {
  "Authorization": `Bot ${process.env.BOT_TOKEN}`,
  "Content-Type": "application/json"
}

let command_data = {
  "name": "foo",
  "type": 1,
  "description": "replies with bar ;/",
}

let countDownCommand = {
  'name': 'jp-countdown', // TODO: think of a cooler name
  'type': 1,
  'description': 'replies with number of days until japan trip ;/',
}

let weeksCountDownCommand = {
  'name': 'weeks-jp-countdown', // TODO: think of a cooler name
  'type': 1,
  'description': 'replies with number of weeks and days until japan trip ;/',
}

let currentExchangeRate = {
  'name': 'current-exchange-rate', // TODO: think of a cooler name
  'type': 1,
  'description': 'replies current USD to JPY exchange rate ;/',
}

let tripInfo = {
  'name': 'trip-info', // TODO: think of a cooler name
  'type': 1,
  'description': 'replies with all trip info ;/',
}

let itProgress = {
  'name': 'it-job-progress', // TODO: think of a cooler name
  'type': 1,
  'description': 'replies number of weeks completed at IT job',
}

let test = {
  'name': 'test', // TODO: think of a cooler name
  'type': 1,
  'description': 'replies with all trip info ;/',
}

const axiosPromises = [
//   axios.post(url, JSON.stringify(command_data), { headers: headers, }),
//   axios.post(url, JSON.stringify(countDownCommand), { headers: headers, }),
//   axios.post(url, JSON.stringify(weeksCountDownCommand), { headers: headers, }),
//   axios.post(url, JSON.stringify(currentExchangeRate), { headers: headers, }),
//   axios.post(url, JSON.stringify(tripInfo), { headers: headers, }),
  // axios.post(url, JSON.stringify(itProgress), { headers: headers, })h
]

// axios.all(axiosPromises)
//   .catch(axios.spread((fooError, countDownError) => {
//     console.log(`${fooError}\n${countDownError}`)
//   }))
//   .then(axios.spread((fooResponse, countDownResponse) => {
//     console.log(`${fooResponse}\n${countDownResponse}`)
//   }));
const postCommandsToDiscordBot = async (axiosPromises) => {
  axios.all(axiosPromises)
    .then(response => console.log(`Status:${response.status}`))
    .catch(error => console.log(error.response.data.errors.name._errors))
}
// postCommandsToDiscordBot(axiosPromises)
// .catch(error => console.log(error))
// .then(response => console.log(`Status:${response.status}`))
// find out how to add countDownCommand to the .post

module.exports = {postCommandsToDiscordBot}
