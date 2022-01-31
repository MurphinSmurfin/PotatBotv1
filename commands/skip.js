module.exports = {
	name: 'skip',
	aliases: ['s'],
	description: 'Skips the current playing song',
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
		console.log(serverQueue);
		serverQueue.songs.shift();
		console.log(serverQueue);
		message.channel.send('Skipping this song!');
	},
};