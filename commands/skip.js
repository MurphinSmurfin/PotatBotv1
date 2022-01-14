module.exports = {
	name: 'skip',
	aliases: ['s'],
	description: 'Skips the current playing song',
	execute(message, args, queue) {
		const voiceChannel = message.member.voice.channel;

		const serverQueue = queue.get(message.guild.id);
		if (!message.member.voice.channel) {
			message.channel.send('Please join a voice channel first');
			return;
		}

		if (!voiceChannel) {
			message.channel.send('You need to be in the same voice channel to stop the music!');
			return;
		}

		if (!serverQueue) {
			message.channel.send('There are no songs in the queue');
			return;
		}
		serverQueue.connection.dispatcher.end();
	},
};