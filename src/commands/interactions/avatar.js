'use strict';
module.exports = {
	data: {
		name: 'avatar',
		description: 'Mostra a foto de perfil sua ou de algum usuário',
		options: [
			{
				name: 'user',
				type: 'USER',
				description: 'O usuário em que a foto de perfil será exibida'
			}
		]
	},
	async run({ Interaction }) {
		const user = Interaction.options.getUser('user') || Interaction.user;
		await Interaction.reply({ files: [user.avatarURL({ dynamic: true, size: 2048 })] });
	}
}
