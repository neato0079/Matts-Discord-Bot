# What it is:
A discord bot for a discord server where friends were planning and coordinating a trip to Japan last January. It runs in AWS using a Lambda that is triggered by an API Gateway which is sent a request from the discord bot.
		
# What it does:
- Registers custom slash commands to the discord bot via authorized "POST" requests.
- Allows discord users to input slash commands to get info about the planned trip such as how much time is left until the flight date and the current exchange rate

# Project Workflow:
- `command.js` sends a `POST` request to `discord bot`. This `POST` request includes authorization headers and data about the command.
- `discord bot` (which is registered and set up in the discord developer portal) is invoked by the `discord client` when a user inputs a slash command.
- When invoked, `discord bot` makes a call to `API Gateway`.
- `API Gateway` triggers a `Lambda` function. In this case `index.js` is ran.
- `index.js` contains the logic to handle a slash command. 
- `index.js` sends `API Gateway` the return value of the slash command logic. `API Gateway` sends this value to `discord bot`.
- `discord bot` displays the returned values in the `discord client`