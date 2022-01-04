'use strict';

import { MessageEmbed, MessageActionRow, MessageButton } from 'discord.js';

//Remover Embeds desse arquivo
// WIP | TEST COMMAND

export default [
	{
		pageid: 'pgOne',
		embed: new MessageEmbed()
			.setTitle('Configurações')
			.setDescription('Página 1')
			.setColor('#000000')
			.addField('Módulos Disponíveis', '<:btn_x:862889505982906408> Moderação\n<:btn_x:862889505982906408> Diversão\n<:btn_x:862889505982906408> Experiência\n<:btn_x:862889505982906408> Fortnite\n<:btn_x:862889505982906408>  Medalhas'),
		components: [
			new MessageActionRow()
				.addComponents(
					new MessageButton()
						.setCustomId('pgModeracao')
						.setLabel('Ver Moderação')
						.setStyle('PRIMARY'),
					new MessageButton()
						.setCustomId('pgDiversao')
						.setLabel('Ver Diversão')
						.setStyle('PRIMARY'),
					new MessageButton()
						.setCustomId('pgLeveling')
						.setLabel('Ver Experiência')
						.setStyle('PRIMARY'),
					new MessageButton()
						.setCustomId('pgFortnite')
						.setLabel('Ver Fortnite')
						.setStyle('PRIMARY'),
					new MessageButton()
						.setCustomId('pgMedals')
						.setLabel('Ver Medalhas')
						.setStyle('PRIMARY')
				),
			new MessageActionRow()
				.addComponents(
					new MessageButton()
						.setCustomId('pgOne')
						.setLabel('Página Anterior')
						.setStyle('SECONDARY')
						.setDisabled(true),
					new MessageButton()
						.setCustomId('pgTwo')
						.setLabel('Próxima Página')
						.setStyle('SECONDARY')
				)
		]
	},
	{
		pageid: 'pgTwo',
		embed: new MessageEmbed()
			.setTitle('Configurações')
			.setDescription('Página 2')
			.setColor('#000000')
			.addField('Configurações da Página', 'Permissões\nLogs\nRedefinir'),
		components: [
			new MessageActionRow()
				.addComponents(
					new MessageButton()
						.setCustomId('pgPermissions')
						.setLabel('Ver Permissões')
						.setStyle('PRIMARY'),
					new MessageButton()
						.setCustomId('pgLogs')
						.setLabel('Ver Canais de Logs')
						.setStyle('PRIMARY'),
					new MessageButton()
						.setCustomId('pgWipe')
						.setLabel('Opções de Redefinição')
						.setStyle('PRIMARY')
				),
			new MessageActionRow()
				.addComponents(
					new MessageButton()
						.setCustomId('pgOne')
						.setLabel('Página Anterior')
						.setStyle('SECONDARY'),
					new MessageButton()
						.setCustomId('pgTwo')
						.setLabel('Próxima Página')
						.setStyle('SECONDARY')
						.setDisabled(true)
				)
		]
	},
	{
		pageid: 'pgModeracao',
		embed: new MessageEmbed()
			.setTitle('Configurações')
			.setDescription('Modulo Moderação\n\nO Módulo de Moderação atualmente está **DESABILITADO**')
			.setColor('#000000')
			.addField('Configurações do Módulo', 'MuteRole: Nenhum\nAuto Cleanup\nBadwords'),
		components: [
			new MessageActionRow()
				.addComponents(
					new MessageButton()
						.setCustomId('pgCleanUp')
						.setLabel('Ver Auto CleanUp')
						.setStyle('PRIMARY'),
					new MessageButton()
						.setCustomId('pgBadWords')
						.setLabel('Ver BadWords')
						.setStyle('PRIMARY')
				),
			new MessageActionRow()
				.addComponents(
					new MessageButton()
						.setCustomId('pgOne')
						.setLabel('Voltar')
						.setStyle('SECONDARY')
				)
		]
	}
]
