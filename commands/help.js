const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'help',
	description: 'Lists all available commands and its usage',
	execute(message) {
		const newEmbed = new MessageEmbed()
			.setColor('#772B8A')
			.setTitle('Commands')
			.setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
			.setDescription('A list of all available commands')
			.addFields(
				{ name: ',ping', value: 'Pong!' },
				{ name: ',help', value: 'Shows all available commands' },
				{ name: ',play', value: 'Plays a video from YouTube from given prompt or link' },
				{ name: ',leave', value: 'Stops the bot and leaves the voice channel' },
			);
		message.channel.send(newEmbed);
	},
};