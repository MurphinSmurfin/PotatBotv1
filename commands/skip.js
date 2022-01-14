module.exports = {
	name: 'skip',
	aliases: ['s'],
	description: 'Skips the current playing song',
	execute(message, args, queue) {
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
		serverQueue.connection.dispatcher.end();
	},
};