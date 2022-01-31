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

		if (!queue.has(message.guild.id)) {
			queue.set(message.guild.id, {
				voiceChannel: voiceChannel,
				textChannel: message.channel,
				connection: null,
				songs: [],
				loop: false,
			});
		}

		await addToQueue();

		if (!queue.get(message.guild.id).connection) {

			queue.get(message.guild.id).connection = await voiceChannel.join();

			try {
				play(queue.get(message.guild.id).connection);
			}
			catch (err) {
				console.log(err);
				queue.delete(message.guild.id);
				message.channel.send('There was an error connecting!');
			}
		}

		async function addToQueue() {
			let title = '';

			// By playlist
			if (ytpl.validateID(args[0])) {
				const playlist = await ytpl(args[0]);

				title = playlist.title;

				playlist.items.forEach(item => {
					queue.get(message.guild.id).songs.push({
						title: item.title,
						url: item.shortUrl,
						author: item.author.name,
						timestamp: item.duration,
					});
				});
			}
			// By URL
			else if (ytdl.validateURL(args[0])) {
				const songInfo = await ytdl.getInfo(args[0]);

				title = songInfo.videoDetails.title;

				queue.get(message.guild.id).songs.push({
					title: songInfo.videoDetails.title,
					url: songInfo.videoDetails.video_url,
					timestamp: timestampConvert(songInfo.videoDetails.lengthSeconds),
					author: songInfo.videoDetails.author.name,
				});
			}
			// By keyword
			else {
				const videoFinder = async (query) => {
					const videoResult = await ytSearch(query);
					return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
				};

				const video = await videoFinder(args.join(' '));

				title = video.title;

				if (video) {
					queue.get(message.guild.id).songs.push({
						title: video.title,
						url: video.url,
						timestamp: video.timestamp,
						author: video.author.name,
					});
				}
				else {
					message.channel.send('Error finding video.');
				}
			}

			message.channel.send(`***${title}*** added to the queue!`);
		}

		function play(connection) {
			const serverQueue = queue.get(message.guild.id);

			if (!serverQueue.songs[0]) {
				message.channel.send('No songs left in queue. Leaving channel.');
				serverQueue.voiceChannel.leave();
				queue.delete(message.guild.id);
				return;
			}

			const dispatcher = connection.play(ytdl(serverQueue.songs[0].url), {
				filter: 'audioonly',
				highWaterMark: 1 << 25,
				quality: 'highestaudio',
				seek: 0,
				volume: 1,
			});

			dispatcher.on('finish', () => {
				if (!serverQueue.loop) serverQueue.songs.shift();
				play(connection);
			});

			serverQueue.textChannel.send(`Now Playing ***${serverQueue.songs[0].title}***`)
				.then(msg => msg.delete({ timeout: 60000 }));
		}

		function timestampConvert(seconds) {
			const hours = Math.floor(seconds / 3600);
			const minutes = ((seconds % 3600) / 60).toFixed(0);
			seconds = (seconds % 60).toFixed(0);
			if (hours < 1) {
				return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
			}
			else {
				return hours + ':' + (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
			}
		}
	},
};