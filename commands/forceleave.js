module.exports = {
	name: 'forceleave',
	aliases: ['fl'],
	description: 'Forces the bot to leave voice channel',
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