# Discord Bot Sequence Diagram
![alt text](https://raw.githubusercontent.com/neato0079/Matts-Discord-Bot/cab03f57b995753384ce7fb2a5389c33c92cb218/img/Discord-bot-flowchart.png)

- `discord bot` is invoked by the `discord client` when a user inputs a slash command.
- When invoked, `discord bot` makes a call to `API Gateway`.
- `API Gateway` triggers a `Lambda` function. In this case `index.js` is ran.
- `index.js` contains the logic to handle a slash command. 
- `index.js` sends `API Gateway` the return value of the slash command logic. `API Gateway` sends this value to `discord bot`.
- `discord bot` displays the returned values in the `discord client`