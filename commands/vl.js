module.exports = {
	name: 'vl',
	description: 'Stops the v command',
	async execute(message) {
		const voiceChannel = message.member.voice.channel;

		if (!voiceChannel) {
			message.channel.send('Please join a voice channel first');
			return;
		}

		await voiceChannel.leave();
		await message.channel.send('Aight! See you next time');
	},
};