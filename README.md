# Matt's Discord Bot
An assortment of slash commands to be used in the discord client. This code has been utilized to help plan an overseas vacation with some friends. More functionalities to come in the future!

# Discord Bot Sequence Diagram
![alt text](https://raw.githubusercontent.com/neato0079/Matts-Discord-Bot/cab03f57b995753384ce7fb2a5389c33c92cb218/img/Discord-bot-flowchart.png)

- `discord bot` is invoked by the `discord client` when a user inputs a slash command.
- When invoked, `discord bot` makes a call to `API Gateway`.
- `API Gateway` triggers a `Lambda` function. In this case `index.js` is ran.
- `index.js` contains the logic to handle a slash command. 
- `index.js` sends `API Gateway` the return value of the slash command logic. `API Gateway` sends this value to `discord bot`.
- `discord bot` displays the returned values in the `discord client`


# Example of Discordbot Function
User inputs a slash command:

![alt text](https://raw.githubusercontent.com/neato0079/Matts-Discord-Bot/5ad85bafcaea2caff47065a936c1cb7fb53bbba7/img/example1.png)

Discord bot responds with the relevant output:

![alt text](https://raw.githubusercontent.com/neato0079/Matts-Discord-Bot/5ad85bafcaea2caff47065a936c1cb7fb53bbba7/img/example2.png)