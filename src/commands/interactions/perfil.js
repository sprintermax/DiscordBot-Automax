'use strict';

import { SlashCommandBuilder } from '@discordjs/builders';

export default {
	enabled: true,
	auto_update: false,
	data: new SlashCommandBuilder()
		.setName('perfil')
		.setDescription('Mostra o perfil de usuário do Servidor')
		.addUserOption((option) => option
			.setName('user')
			.setDescription('O usuário em que o perfil será exibido')
		),
	async run({ Interaction }) {
		const user = Interaction.options.getUser('user') || Interaction.user;
		//WIP
	}
}
