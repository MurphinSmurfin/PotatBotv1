const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'now playing',
	aliases: ['np'],
	description: 'Shows the current playing song timestamp',
	execute(message, args, queue, commands) {
		const voiceChannel = message.member.voice.channel;

		const serverQueue = queue.get(message.guild.id);

		if (!voiceChannel) {
			message.channel.send('Please join a voice channel first');
			return;
		}

		if (!serverQueue) {
			message.channel.send('There are no songs in the queue');
			return;
		}
		
		function timestampConvert(millis) {
			var hours = Math.floor(millis / 3600000);
			var minutes = ((millis % 3600000)/ 60000).toFixed(0);
			var seconds = ((millis % 60000) / 1000).toFixed(0);
			if (hours < 1)
			{
				return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
			}
			else {
				return hours + ":" + (minutes < 10 ? '0' : '') + minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
			}
		  }

		const newEmbed = new MessageEmbed()
			.setColor('#772B8A')
			.setTitle('Now Playing')
			.setDescription(`${(timestampConvert(serverQueue.connection.dispatcher.streamTime))} / ${serverQueue.songs[0].timestamp}` )

			message.channel.send(newEmbed);
	}
};