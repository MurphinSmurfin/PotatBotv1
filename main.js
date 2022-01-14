const Discord = require('discord.js');
require('dotenv').config();
const bot = new Discord.Client();

bot.commands = new Discord.Collection();
bot.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler => {
	require(`./handlers/${handler}`)(bot);
});

bot.login(process.env.BOT_TOKEN);