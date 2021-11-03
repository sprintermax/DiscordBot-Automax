'use strict';

import DiscordJS from 'discord.js';

import { SlashCommandBuilder } from '@discordjs/builders';

export default {
	scope: 'global',
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Verifica a latência do Bot e do servidor'),
	async run({ Client, Interaction }) {
		await Interaction.reply({
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
