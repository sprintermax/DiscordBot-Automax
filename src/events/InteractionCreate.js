'use strict';

module.exports = {
	name: 'interactionCreate',
	async run({ DiscordJS, Client, Mongoose, Schemas }, Interaction) {
		if (Interaction.isCommand()) {
			if (!Client.Commands.Interactions.has(Interaction.commandName)) return;
			await Interaction.deferReply();
			try {
				await Client.Commands.Interactions.get(Interaction.commandName)
					.run({ DiscordJS, Client, Mongoose, Schemas, Interaction });
			} catch (error) {
				if (!Client.application?.owner) await Client.application?.fetch();
				await Interaction.editReply({
					content: 'Ops! Ocorreu um erro inesperado.',
					components: [],
					embeds: [
						new DiscordJS.MessageEmbed()
							.setTitle('Erro na Execução do Código')
							.setDescription(`Se o problema persistir avise Sprintermax#0084\n\n\`${error.message}\``)
							.setColor('#000000')
							.addField('Saída do Console:', `\`\`\`${error.stack.length > 750 ? error.stack.substring(0, 750) + '\n[...]' : error.stack}\`\`\``)
							.setFooter(`${Interaction.guild?.name || Client.user.username}`, Interaction.guild?.iconURL() || Client.user.avatarURL() || '')
							.setTimestamp()
					]
				});
			}
		}
		if (Interaction.isButton()) { }
		if (Interaction.isMessageComponent()) { }
		if (Interaction.isSelectMenu()) { }
	}
}
