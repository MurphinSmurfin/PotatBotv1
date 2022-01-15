module.exports = {
	name: 'loop',
	aliases: ['l'],
	description: 'Loops the current song',
	execute(message, args, queue, commands) {
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
		serverQueue.loop = !serverQueue.loop;
		
		if (serverQueue.loop === true){
			message.channel.send('Looping current song')
		}
		else {
			message.channel.send('Stopped looping')
		}
	}
}