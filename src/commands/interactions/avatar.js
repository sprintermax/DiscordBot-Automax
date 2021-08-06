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
	async run({ DiscordJS, Interaction }) {
		const user = Interaction.options.getUser('user') || Interaction.user;
		await Interaction.reply({
			embeds: [
				new DiscordJS.MessageEmbed()
					.setDescription(`**Aqui está, a imagem de perfil de <@${user.id}>:**`)
					.setColor('#000000')
					.setImage(user.avatarURL({ dynamic: true, size: 2048 }))
					.setFooter(Interaction.guild.name, Interaction.guild.iconURL() || '')
					.setTimestamp()
			]
		});

	}
}
