import os # this is a library that allows the code to interact with the local os. ie reading local file contents. kinda like fs in js

# see more here: https://docs.python.org/3/library/os.html

import discord # discord's python API: https://discordpy.readthedocs.io/en/stable/
from dotenv import load_dotenv # allows us to interact with .env files

load_dotenv()

TOKEN = os.getenv('BOT_TOKEN')
intents = discord.Intents.default()
client = discord.Client(intents=intents)

@client.event
async def on_ready():
    print(f'{client.user} has connected to Discord!')

client.run(TOKEN)