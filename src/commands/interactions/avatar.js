'use strict';

import { SlashCommandBuilder } from '@discordjs/builders';

export default {
	enabled: true,
	auto_update: false,
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Mostra a foto de perfil sua ou de algum usuário')
		.addUserOption((option) => option
			.setName('user')
			.setDescription('O usuário em que a foto de perfil será exibida')
		),
	async run({ Interaction }) {
		const user = Interaction.options.getUser('user') || Interaction.user;
		await Interaction.reply({ files: [user.displayAvatarURL({ dynamic: true, size: 2048 })] });
	}
}
