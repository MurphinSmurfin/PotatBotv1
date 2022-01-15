const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'queue',
	aliases: ['q'],
	description: 'Shows all the songs queued',
	execute(message, args, queue) {
		const serverQueue = queue.get(message.guild.id);

		const newEmbed = new MessageEmbed();

		if (!serverQueue) {
			newEmbed.setColor('#772B8A')
				.setTitle('There are no songs in the queue');
		}
		else {
			newEmbed.setColor('#772B8A')
				.setTitle('Songs in queue')
				.setDescription(serverQueue.songs.reduce((acc, song) => acc + `***${song.title} by ${song.author}***\n`, ''));
		}
		message.channel.send(newEmbed);
	},
};