'use strict';

import HandleError from '../utils/HandleError.js';

export default {
	name: 'interactionCreate',
	async run(Client, Interaction) {
		try {
			if (Interaction.isCommand() && Client.Commands.Interactions.has(Interaction.commandName)) {
				const Command = await Client.Commands.Interactions.get(Interaction.commandName);
				if (Command.enabled) Command.run({ Client, Interaction });
				else await Interaction.reply({
					content: 'Esse comando está indisponível no momento.',
					ephemeral: true
				});
			}

			if (Interaction.isButton()) { }
			if (Interaction.isMessageComponent()) { }
			if (Interaction.isSelectMenu()) { }
		} catch (Err) {
			HandleError({ Client, Interaction, Err });
		}
	}
}
