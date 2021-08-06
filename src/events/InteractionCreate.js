'use strict';

module.exports = {
	name: 'interactionCreate',
	async run({ DiscordJS, Client, Mongoose, Schemas }, Interaction) {
		if (Interaction.isCommand()) {
			if (!Client.Commands.Interactions.has(Interaction.commandName)) return;
			try {
				await Client.Commands.Interactions.get(Interaction.commandName)
					.run({ DiscordJS, Client, Mongoose, Schemas, Interaction });
			} catch (error) {
				console.error(error);
				await Interaction.reply({ content: 'Ocorreu um erro ao executar o comando!', ephemeral: true });
			}
		}
		if (Interaction.isButton()) { }
		if (Interaction.isMessageComponent()) { }
		if (Interaction.isSelectMenu()) { }
	}
}
