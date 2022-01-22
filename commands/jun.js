const ytdl = require('ytdl-core');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'jun',
	description: 'DJ Shota paying homage to Nujabes',
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
			const stream = ytdl('https://www.youtube.com/watch?v=R_ujWNu5h8U', {
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

		const newEmbed = new MessageEmbed()
			.setColor('#772B8A')
			.setTitle('Tracklist')
			.addFields(
				{ name: 'NINGEN State of Mind', value: ' by Ritto' },
				{ name: 'Reflection Eternal', value: ' by Nujabes' },
				{ name: '夢の続き(Yume no Tsudzuki)', value: ' by EVISBEATS' },
				{ name: '100MILLION', value: ' by NAMEDARUMA' },
				{ name: 'Luv(sic) pt.1 (briefly)', value: ' by Nujabes' },
				{ name: 'Let me know ya...', value: ' by TOKONA-X (ft. Kalassy Nikoff)' },
				{ name: 'Luv(sic) pt.1', value: ' by Nujabes' },
				{ name: 'Luv(sic) pt.2', value: ' by Nujabes' },
				{ name: 'Luv(sic) pt.3', value: ' by Nujabes (ft. Shing02)' },
				{ name: 'In my Feelings (Brasstracks Cover)', value: ' by Drake' },
				{ name: 'Just the Two of Us', value: ' by Grover Washington Jr. (ft. Bill Withers)' },
				{ name: 'Another Reflection (Vocal: Sankara - State of Mind)', value: ' by Nujabes' },
			);

		message.channel.send(newEmbed);
	},
};