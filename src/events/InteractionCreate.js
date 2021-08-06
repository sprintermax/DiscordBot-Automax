'use strict';

exports.defs = {
	name: 'interactionCreate'
}

exports.run = async (Interaction, { DiscordJS, Client, Mongoose, Schemas }) => {

	if (Interaction.isCommand()) {
		if (Interaction.commandName === 'ping') {
			await Interaction.reply('Pong!');
		}
	}
}
