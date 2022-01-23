module.exports = {
	name: 'loop',
	aliases: ['l'],
	description: 'Loops the current song',
	execute(message, args, queue) {
		const voiceChannel = message.member.voice.channel;

		const serverQueue = queue.get(message.guild.id);

		const botVoiceChannel = message.guild.voice.channel;

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
		serverQueue.loop = !serverQueue.loop;

		if (serverQueue.loop === true) {
			message.channel.send('Looping current song');
		}
		else {
			message.channel.send('Stopped looping');
		}
	},
};