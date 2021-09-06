'use strict';

const DiscordJS = require('discord.js');

module.exports = async ({ Client, Err, Interaction, Message, ProgErr }) => {
	if (Err) try {
		console.error('[ ERRO NA EXECUÇÃO ]\n', Err);
		const { guild } = Interaction || Message;
		const ErrMsg = {
			content: 'Ops! Ocorreu um erro inesperado.',
			ephemeral: true,
			components: [],
			files: [],
			embeds: [
				new DiscordJS.MessageEmbed()
					.setTitle('Erro na Execução do Código')
					.setDescription(`Se o problema persistir avise Sprintermax#0084\n\n\`${Err.message}\``)
					.setColor('#000000')
					.addField('Saída do Console:', `\`\`\`${Err.stack.length > 750 ? Err.stack.substring(0, 750) + '\n[...]' : Err.stack}\`\`\``)
					.setFooter(`${guild?.name || Client.user.username}`, guild?.iconURL() || Client.user.avatarURL() || '')
					.setTimestamp()
			]
		}
		if (Interaction) {
			if (Interaction.isCommand()) {
				if (Interaction.replied) await Interaction.editReply(ErrMsg);
				else await Interaction.reply(ErrMsg);
			}
			if (Interaction.isButton()) { }
			if (Interaction.isMessageComponent()) { }
			if (Interaction.isSelectMenu()) { }
		} else if (Message) {

		}
	} catch (ProgramErr) {
		ProgErr = ProgramErr;
	}
	if (ProgErr) console.error('\n\n[ ERRO DO PROGRAMA ]\n', ProgErr, '\n\n');
}
