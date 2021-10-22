'use strict';

import HandleError from '../utils/HandleError.js';

export default {
	name: 'interactionCreate',
	async run(Client, Interaction) {
		try {
			if (Interaction.isCommand() && Client.Commands.Interactions.has(Interaction.commandName)) {
				await Client.Commands.Interactions.get(Interaction.commandName)
					.run({ Client, Interaction });
			}

			if (Interaction.isButton()) { }
			if (Interaction.isMessageComponent()) { }
			if (Interaction.isSelectMenu()) { }
		} catch (Err) {
			HandleError({ Client, Interaction, Err });
		}
	}
}
