## THIS README IS A WIP (1/24/23)

- `command.js` sends a `POST` request to `discord bot`. This `POST` request includes authorization headers and data about the command.
- `discord bot` is invoked by the `discord client` when a user inputs a slash command.
- When invoked, `discord bot` makes a call to `API Gateway`.
- `API Gateway` triggers a `Lambda` function. In this case `index.js` is ran.
- `index.js` contains the logic to handle a slash command. 
- `index.js` sends `API Gateway` the return value of the slash command logic. `API Gateway` sends this value to `discord bot`.
- `discord bot` displays the returned values in the `discord client`