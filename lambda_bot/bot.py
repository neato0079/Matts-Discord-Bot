# following this resource: https://realpython.com/how-to-make-a-discord-bot-python/#responding-to-events

import os # this is a library that allows the code to interact with the local os. ie reading local file contents. kinda like fs in js

# see more here: https://docs.python.org/3/library/os.html

import discord # discord's python API: https://discordpy.readthedocs.io/en/stable/
from dotenv import load_dotenv # allows us to interact with .env files

load_dotenv()
TOKEN = os.getenv('BOT_TOKEN')
GUILD = os.getenv('GUILD_ID')

intents = discord.Intents.default()
client = discord.Client(intents=intents)

@client.event
async def on_ready():
    print(f'{client.user} has connected to Discord!')
    for guild in client.guilds:
        if guild.id == int(GUILD):
            break

    print(
        f'{client.user} is connected to the following guild:\n'
        f'{guild.name}(id: {guild.id})'
    )
    await client.close()


client.run(TOKEN)

