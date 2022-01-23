module.exports = {
	name: 'leave',
	aliases: ['stop'],
	description: 'Stops the bot and leave the voice channel',
	async execute(message, args, queue) {
		const voiceChannel = message.member.voice.channel;

		if (!voiceChannel) {
			message.channel.send('Please join a voice channel first');
			return;
		}

		queue.delete(message.guild.id);
		voiceChannel.leave();
		message.channel.send('Queue is cleared! See you next time!');
	},
};