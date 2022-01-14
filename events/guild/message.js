require('dotenv').config();

const serverQueue = new Map();

module.exports = (bot, message) => {
	const prefix = process.env.PREFIX;
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const cmd = args.shift().toLowerCase();

	const command = bot.commands.get(cmd) || bot.commands.find(a => a.aliases && a.aliases.includes(cmd));

	if (command) command.execute(message, args, serverQueue, bot.commands);
};