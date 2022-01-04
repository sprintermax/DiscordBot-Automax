'use strict';

import DiscordJS from 'discord.js';

export default {
	enabled: false,
	auto_update: false,
	data: {
		name: 'testcmd',
		description: 'Dummy command for testing'
	},
	async run({ Client, message }) {
		await message.reply({
			content: "oi, mensagem <@&852200302261960714> <@307331927772364801>",

			allowedMentions: {
				users: ["307331927772364801"],
				roles: []
			},
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
