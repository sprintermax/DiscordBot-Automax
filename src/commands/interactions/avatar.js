'use strict';


const CommandBuilder = require('../../utils/InteractionCommandBuilder.js');

module.exports = {
	scope: 'global',
	data: new CommandBuilder.Command()
		.SetName('avatar')
		.SetDesc('Mostra a foto de perfil sua ou de algum usuário')
		.AddOption(
			new CommandBuilder.CommandOption()
				.SetName('user')
				.SetType('USER')
				.SetDesc('O usuário em que a foto de perfil será exibida')
		),
	async run({ Interaction }) {
		const user = Interaction.options.getUser('user') || Interaction.user;
		await Interaction.reply({ files: [user.avatarURL({ dynamic: true, size: 2048 })] });
	}
}
