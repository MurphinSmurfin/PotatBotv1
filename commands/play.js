const ytdl = require('ytdl-core');
const ytpl = require('ytpl');
const ytSearch = require('yt-search');

module.exports = {
	name: 'play',
	aliases: ['p'],
	description: 'Joins the voice channel and play the audio from a YouTube video',
	async execute(message, args, queue) {
		const voiceChannel = message.member.voice.channel;

		if (!voiceChannel) {
			message.channel.send('Please join a voice channel first');
			return;
		}

		if (!args.length) {
			message.channel.send('You need to enter a keyword of the video');
			return;
		}

		let song = {};

		if (ytdl.validateURL(args[0])) {
			const songInfo = await ytdl.getInfo(args[0]);
			song = {
				title: songInfo.videoDetails.title,
				url: songInfo.videoDetails.video_url,
			};
		}
		else {
			const videoFinder = async (query) => {
				const videoResult = await ytSearch(query);
				return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
			};

			const video = await videoFinder(args.join(' '));

			if (video) {
				song = { title: video.title, url: video.url };
			}
			else {
				message.channel.send('Error finding video.');
			}
		}

		if (!queue.get(message.guild.id)) {
			const queueConstruct = {
				voiceChannel: voiceChannel,
				textChannel: message.channel,
				connection: null,
				songs: [],
			};

			queueConstruct.songs.push(song);

			const connection = await voiceChannel.join();

			queueConstruct.connection = connection;

			queue.set(message.guild.id, queueConstruct);

			try {
				play(queue.get(message.guild.id).connection);
			}
			catch (err) {
				console.log(err);
				queue.delete(message.guild.id);
				message.channel.send('There was an error connecting!');
			}
		}
		else {
			queue.get(message.guild.id).songs.push(song);
			return message.channel.send(`***${song.title}*** added to the queue!`);
		}

		function play(connection) {
			const serverQueue = queue.get(message.guild.id);

			if (!serverQueue.songs[0]) {
				serverQueue.voiceChannel.leave();
				queue.delete(message.guild.id);
				return;
			}

			const dispatcher = connection.play(ytdl(serverQueue.songs[0].url), { seek: 0, volume: 1 });

			dispatcher.on('finish', () => {
				serverQueue.songs.shift();
				play(connection);
			});

			serverQueue.textChannel.send(`Now Playing ***${serverQueue.songs[0].title}***`);
		}
	},
};