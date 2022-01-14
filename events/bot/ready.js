module.exports = (bot) => {
	console.log('The potato has awaken!');
	bot.user.setActivity('a potato | ,help', { type: 'LISTENING' });
};