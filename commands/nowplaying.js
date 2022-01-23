const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'nowplaying',
	aliases: ['np'],
	description: 'Shows the current playing song timestamp',
	execute(message, args, queue) {
		const voiceChannel = message.member.voice.channel;

		const serverQueue = queue.get(message.guild.id);

		const botVoiceChannel = message.guild.me.voice.channel;


		if (!voiceChannel) {
			message.channel.send('Please join a voice channel first');
			return;
		}

		if (!botVoiceChannel) {
			message.channel.send('I am not in a voice channel');
			return;
		}

		if (!serverQueue) {
			message.channel.send('There are no songs in the queue');
			return;
		}

		function timestampConvert(millis) {
			const hours = Math.floor(millis / 3600000);
			const minutes = ((millis % 3600000) / 60000).toFixed(0);
			const seconds = ((millis % 60000) / 1000).toFixed(0);
			if (hours < 1) {
				return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
			}
			else {
				return hours + ':' + (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
			}
		}

		const newEmbed = new MessageEmbed()
			.setColor('#772B8A')
			.setTitle('Now Playing')
			.setDescription(`${serverQueue.songs[0].title}\n [${(timestampConvert(serverQueue.connection.dispatcher.streamTime))} / ${serverQueue.songs[0].timestamp}]`);

		message.channel.send(newEmbed);
	},
};