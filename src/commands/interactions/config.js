'use strict';

import { SlashCommandBuilder } from '@discordjs/builders';

import ConfigPages from './config/pages.js';

// WIP | TEST COMMAND

export default {
	enabled: true,
	auto_update: false,
	data: new SlashCommandBuilder()
		.setName('config')
		.setDescription('Configuração do Bot no Servidor')
		.addSubcommand((subcmd) => subcmd
			.setName('view')
			.setDescription('Visualiza as configurações atuais do Bot no Servidor')
		)
		.addSubcommand((subcmd) => subcmd
			.setName('set')
			.setDescription('Altera alguma configuração do Bot no Servidor')
			.addStringOption((option) => option
				.setName('config')
				.setDescription('ID da configuração a ser alterada')
				.setRequired(true)
			)
			.addBooleanOption((option) => option
				.setName('bool')
				.setDescription('Envia um valor Booleano para o Bot')
			)
			.addNumberOption((option) => option
				.setName('number')
				.setDescription('Envia um valor Numérico para o Bot')
			)
			.addChannelOption((option) => option
				.setName('channel')
				.setDescription('Envia um Canal para o Bot')
			)
			.addUserOption((option) => option
				.setName('user')
				.setDescription('Envia um Usuário para o Bot')
			)
			.addRoleOption((option) => option
				.setName('role')
				.setDescription('Envia um Cargo para o Bot')
			)
		)
		.addSubcommand((subcmd) => subcmd
			.setName('reset')
			.setDescription('Redefine configurações de volta para o padrão')
			.addStringOption((option) => option
				.setName('config')
				.setDescription('Qual conteúdo a ser redefinido')
				.setRequired(true)
				.addChoices([
					['Permissões', 'perms'],
					['Experiência', 'leveling'],
					['BadWords', 'badwords'],
					['Perfis', 'profiles']
				])
			)
		),
	async run({ Client, Interaction }) {
		const cmdCache = {
			current_page: 'pgOne'
		}

		await Interaction.deferReply();

		const msg = await Interaction.editReply({
			embeds: [
				ConfigPages.find(page => page.pageid == cmdCache.current_page).embed
					.setFooter(`${Interaction.guild?.name || Client.user.username}`, Interaction.guild?.iconURL() || Client.user.avatarURL() || '')
					.setTimestamp()
			],
			components: ConfigPages.find(page => page.pageid == cmdCache.current_page).components
		});



		const ICollector = msg.createMessageComponentCollector({ idle: 60000 });

		ICollector.on('collect', async i => {
			if (i.user.id !== Interaction.user.id) return i.reply({ content: 'Você não pode alterar opções do comando de outro usuário.', ephemeral: true });

			cmdCache.current_page = i.customId;

			await i.update({
				embeds: [
					ConfigPages.find(page => page.pageid == i.customId).embed
						.setFooter(`${Interaction.guild?.name || Client.user.username}`, Interaction.guild?.iconURL() || Client.user.avatarURL() || '')
						.setTimestamp()
				],
				components: ConfigPages.find(page => page.pageid == i.customId).components
			});
		});
		ICollector.on('end', (c, r) => {
			if (r !== 'messageDelete') Interaction.editReply({ components: [] });
		});
	}
}
