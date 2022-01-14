module.exports = {
	name: 'leave',
	aliases: ['stop'],
	description: 'stops the bot and leave the voice channel',
	async execute(message, args, queue) {
		const serverQueue = queue.get(message.guild.id);

		const voiceChannel = message.member.voice.channel;

		if (!voiceChannel) return message.channel.send('You need to be in the same voice channel to stop the music!');
		if (!serverQueue) {
			return message.channel.send('There are no songs in the queue');
		}
		queue.delete(message.guild.id);
		await voiceChannel.leave();
		await message.channel.send('Bing bong! See you next time!');
	},
};