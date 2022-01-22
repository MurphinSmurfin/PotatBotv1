module.exports = {
	name: 'leave',
	aliases: ['stop'],
	description: 'Stops the bot and leave the voice channel',
	async execute(message, args, queue) {
		const serverQueue = queue.get(message.guild.id);

		const voiceChannel = message.member.voice.channel;

		if (!voiceChannel) {
			message.channel.send('Please join a voice channel first');
			return;
		}

		if (!serverQueue) {
			message.channel.send('There are no songs in the queue');
			return;
		}

		queue.delete(message.guild.id);
		await voiceChannel.leave();
		await message.channel.send('Bing bong! See you next time!');
	},
};