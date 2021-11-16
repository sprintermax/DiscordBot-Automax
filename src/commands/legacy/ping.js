'use strict';

import DiscordJS from 'discord.js';

export default {
	enabled: false,
	auto_update: false,
	data: {
		name: 'ping',
		description: 'Verifica a latência do Bot e do servidor'
	},
	async run({ Client, message }) {
		await message.reply({
			embeds: [
				new DiscordJS.MessageEmbed()
					.setTitle('🏓 Pong!')
					.setDescription('Aqui está o tempo de resposta do Bot:')
					.setColor('#000000')
					.addField('Latência do Bot:', Math.floor(Date.now() - message.createdTimestamp) + 'ms', true)
					.addField('\u200b', '\u200b', true)
					.addField('Latência da API:', Math.round(Client.ws.ping) + 'ms', true)
					.setFooter(`${message.guild?.name || Client.user.username}`, message.guild?.iconURL() || Client.user.avatarURL() || '')
					.setTimestamp()
			]
		});
	}
}
