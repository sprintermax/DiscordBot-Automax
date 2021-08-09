'use strict';

const fetch = require('node-fetch');

const { UpdateComponents, FindDisabledButton } = require('../../utils/MessageComponentActions.js');

module.exports = {
	data: {
		name: 'fnstats',
		description: 'Mostra estatísticas do Fortnite de um jogador',
		options: [
			{
				name: 'player',
				type: 'STRING',
				description: 'O jogador para rastrear as estatísticas',
				required: true
			},
			{
				name: 'platform',
				type: 'STRING',
				description: 'O jogador para rastrear as estatísticas',
				choices: [
					{
						name: "Epic",
						value: "epic",
						emoji: '670850632038744075'
					},
					{
						name: "Xbox",
						value: "xbl",
						emoji: '532685876975894548'
					},
					{
						name: "Playstation",
						value: "psn",
						emoji: '532685915395588097'
					}
				]
			}
		]
	},
	async run({ Interaction, DiscordJS, Client }) {
		const player = Interaction.options.getString('player');
		const accountType = Interaction.options.getString('platform') || 'epic';
		await Client.channels.fetch(Interaction.channelId);
		let lastimage;
		const msg = await Interaction.editReply({
			content: `Estatísticas de **${player}** na plataforma **${accountType.toUpperCase()}**`,
			components: [
				{
					type: 'ACTION_ROW',
					components: [
						{
							type: 'BUTTON',
							label: 'Todos',
							style: 'SUCCESS',
							custom_id: 'image_all',
							emoji: '⭐',
							disabled: true
						},
						{
							type: 'BUTTON',
							label: 'Mouse e Teclado',
							style: 'SUCCESS',
							custom_id: 'image_keyboardMouse',
							emoji: '⌨️'
						},
						{
							type: 'BUTTON',
							label: 'Controle',
							style: 'SUCCESS',
							custom_id: 'image_gamepad',
							emoji: '🎮'
						},
						{
							type: 'BUTTON',
							label: 'Toque',
							style: 'SUCCESS',
							custom_id: 'image_touch',
							emoji: '📱'
						}
					]
				},
				{
					type: 'ACTION_ROW',
					components: [
						{
							type: 'BUTTON',
							label: 'Sempre',
							style: 'PRIMARY',
							custom_id: 'timewindow_lifetime',
							emoji: '⭐',
							disabled: true
						},
						{
							type: 'BUTTON',
							label: 'Temporada Atual',
							style: 'PRIMARY',
							custom_id: 'timewindow_season',
							emoji: '731314508730990603'
						}
					]
				}
			],
			embeds: [
				StatsEmbed(await GetPlayerStatsImage(), true)
			]
		});
		const collector = msg.createMessageComponentCollector({ idle: 30000 });

		collector.on('collect', async i => {
			if (i.user.id === Interaction.user.id) {
				await i.update({
					components: UpdateComponents(i.message.components, 'MIXED', i),
					embeds: [
						StatsEmbed('', true)
					]
				});
				UpdateStatsMessage(i, msg.components);

			} else {
				i.reply({ content: 'Você não pode alterar opções do comando de outro usuário.', ephemeral: true });
			}
		});
		collector.on('end', collected => {
			Interaction.editReply({ components: [] });
		});

		async function GetPlayerStatsImage(idata) {
			const timeWindow = idata ? FindDisabledButton(idata, 'timewindow_') : 'lifetime';
			const image = idata ? FindDisabledButton(idata, 'image_') : 'all';
			return await fetch(`https://fortnite-api.com/v2/stats/br/v2?name=${player}&image=${image}&accountType=${accountType}&timeWindow=${timeWindow}`).then(res => res.json());
		}

		async function UpdateStatsMessage(i, components) {
			i.editReply({
				components: UpdateComponents(components, 'LOAD_OPTIONS', i),
				embeds: [
					StatsEmbed(await GetPlayerStatsImage(components))
				]
			})
		}

		function StatsEmbed(request, loading) {
			const embed = new DiscordJS.MessageEmbed()
				.setColor('#000000')
				.setFooter(`${Interaction.guild?.name || Client.user.username}`, Interaction.guild?.iconURL() || Client.user.avatarURL() || '')
				.setTimestamp()
			if (request?.status === 200) {
				lastimage = request.data.image;
				embed.setImage(lastimage);
			}
			else if (loading && !request) {
				embed
					.setDescription('Aguarde, estou atualizando as informações...')
					.setImage(lastimage)

			}
			else embed
				.setTitle('Oops!')
				.setDescription('Não encontrei nenhuma estatística salva de acordo com as opções selecionadas.')
			return embed
		}
	}
}

