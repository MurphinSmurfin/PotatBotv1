const ytdl = require('ytdl-core');

module.exports = {
	name: 'v',
	description: 'iykyk',
	async execute(message, args, queue) {
		const voiceChannel = message.member.voice.channel;
		const serverQueue = queue.get(message.guild.id);

		if (!voiceChannel) {
			message.channel.send('Please join a voice channel first');
			return;
		}

		if (serverQueue) {
			message.channel.send('You can\'t run this while music queue exists');
			return;
		}

		voiceChannel.join().then(connection => {
			const stream = ytdl('https://www.youtube.com/watch?v=g9gHC2quF3A', {
				filter: 'audioonly',
				highWaterMark: 1 << 25,
				quality: 'highestaudio',
				seek: 0,
				volume: 1,
			});

			const dispatcher = connection.play(stream);
			dispatcher.on('finish', () => {
				voiceChannel.leave();
			});
		});
	},
};