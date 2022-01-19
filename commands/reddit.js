const redditFetch = require('reddit-fetch');

module.exports = {
	name: 'reddit',
	aliases: ['r'],
	description: 'Fetches a random hot reddit post',
	async execute(message, args) {
		let sub = 'all';

		if (args[0]) sub = args[0];

		await redditFetch({
			subreddit: sub,
			sort: 'hot',
			allowNSFW: false,
			allowModPost: false,
			allowCrossPost: true,
		}).then(post => {
			console.log(redditFetch);
			message.channel.send(post.url);
		});
	},
};