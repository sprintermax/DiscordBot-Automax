'use strict';

module.exports = {
	data: {
		name: 'ping',
		description: 'Verifica a latência do Bot e do servidor'
	},
	async run({ DiscordJS, Client, Interaction }) {
		await Interaction.editReply({
			embeds: [
				new DiscordJS.MessageEmbed()
					.setTitle('🏓 Pong!')
					.setDescription('Aqui está o tempo de resposta do Bot:')
					.setColor('#000000')
					.addField('Latência do Bot:', Math.floor(Date.now() - Interaction.createdTimestamp) + 'ms', true)
					.addField('\u200b', '\u200b', true)
					.addField('Latência da API:', Math.round(Client.ws.ping) + 'ms', true)
					.setFooter(`${Interaction.guild?.name || Client.user.username}`, Interaction.guild?.iconURL() || Client.user.avatarURL() || '')
					.setTimestamp()
			]
		});
	}
}
