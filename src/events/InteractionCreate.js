'use strict';

const HandleError = require('../utils/HandleError.js');

module.exports = {
	name: 'interactionCreate',
	async run(Runtime, Interaction) {
		const { Client } = Runtime;
		try {
			if (Interaction.isCommand() && Client.Commands.Interactions.has(Interaction.commandName)) {
				await Client.Commands.Interactions.get(Interaction.commandName)
					.run({ Runtime, Interaction });
			}

			if (Interaction.isButton()) { }
			if (Interaction.isMessageComponent()) { }
			if (Interaction.isSelectMenu()) { }
		} catch (Err) {
			HandleError({ Runtime, Interaction, Err });
		}
	}
}
