const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'help',
	description: 'Lists all available commands and its usage',
	execute(message, args, queue, commands) {
		const newEmbed = new MessageEmbed()
			.setColor('#772B8A')
			.setTitle('Commands')
			.setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
			.setDescription('A list of all available commands')

			commands.each(command => {        
                    newEmbed.addField(`,${command.name}`,`${command.description}`, false);
            });
		message.channel.send(newEmbed);
	},
};