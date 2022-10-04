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
  'name': 'jpcountdown',
  'type': 1,
  'description': 'replies with number of days until japan trip ;/',
}

axios
    .post(url, JSON.stringify(command_data), {headers: headers,})
    .catch(error => console.log(error))
    .then(response => console.log(`Status:${response.status}`))

axios
    .post(url, JSON.stringify(countDownCommand), {headers: headers,})
    .catch(error => console.log(error))
    .then(response => console.log(`Status:${response.status}`))

// find out how to add countDownCommand to the .post