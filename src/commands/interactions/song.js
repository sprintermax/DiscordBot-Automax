'use strict';
const ytdl = require('ytdl-core');
const ytsc = require('yt-search');

const CommandBuilder = require('../../utils/InteractionCommandBuilder.js');

const Queue = new Map();

// Play[list] - Pause - Resume - Skip[vote] - Remove - Move - nowplaying - join - leave - queue
//? Loop - Volume

module.exports = {
	scope: 'guild',
	data: new CommandBuilder.Command()
		.SetName('song')
		.SetDesc('Comando relacionado a reprodução de audios através do Youtube')
		.AddOption(
			new CommandBuilder.CommandOption()
				.SetName('play')
				.SetDesc('Adiciona um vídeo na lista de reprodução do bot')
				.SetType('SUB_COMMAND')
				.AddOption(
					new CommandBuilder.CommandOption()
						.SetName('video')
						.SetDesc('Link do vídeo, playlist ou texto para busca')
						.SetType('STRING')
						.SetAsRequired()
				)
		)
		.AddOption(
			new CommandBuilder.CommandOption()
				.SetName('pause')
				.SetDesc('Pausa a reprodução do bot')
				.SetType('SUB_COMMAND')
		)
		.AddOption(
			new CommandBuilder.CommandOption()
				.SetName('resume')
				.SetDesc('Retoma a reprodução do bot')
				.SetType('SUB_COMMAND')
		)
		.AddOption(
			new CommandBuilder.CommandOption()
				.SetName('skip')
				.SetDesc('Pula o que está em reprodução no momento')
				.SetType('SUB_COMMAND')
		)
		.AddOption(
			new CommandBuilder.CommandOption()
				.SetName('remove')
				.SetDesc('Remove algum item da lista de reprodução')
				.SetType('SUB_COMMAND')
				.AddOption(
					new CommandBuilder.CommandOption()
						.SetName('id')
						.SetDesc('Posição do vídeo na lista de reprodução a ser removido')
						.SetType('INTEGER')
						.SetAsRequired()
				)
		)
		.AddOption(
			new CommandBuilder.CommandOption()
				.SetName('queue')
				.SetDesc('Mostra a lista de reprodução atual')
				.SetType('SUB_COMMAND')
		)
		.AddOption(
			new CommandBuilder.CommandOption()
				.SetName('move')
				.SetDesc('Altera a posição de um vídeo da lista de reprodução')
				.SetType('SUB_COMMAND')
				.AddOption(
					new CommandBuilder.CommandOption()
						.SetName('from')
						.SetDesc('ID do vídeo na playlist a ser movido')
						.SetType('INTEGER')
						.SetAsRequired()
				)
				.AddOption(
					new CommandBuilder.CommandOption()
						.SetName('to')
						.SetDesc('Posição na playlist em que o vídeo irá ficar')
						.SetType('INTEGER')
						.SetAsRequired()
				)
		)
		.AddOption(
			new CommandBuilder.CommandOption()
				.SetName('join')
				.SetDesc('Entra no chat de voz que você está ou que foi especificado')
				.SetType('SUB_COMMAND')
				.AddOption(
					new CommandBuilder.CommandOption()
						.SetName('channel')
						.SetDesc('ID do vídeo na playlist a ser movido')
						.SetType('CHANNEL')
				)
		)
		.AddOption(
			new CommandBuilder.CommandOption()
				.SetName('leave')
				.SetDesc('Sai do chat de voz atual se o bot estiver em um')
				.SetType('SUB_COMMAND')
		),
	async run({ Client, Interaction }) {
		const VoiceChannel = Interaction.options.getChannel('channel') || Interaction.member.voice.channel;
		console.log(VoiceChannel)
	}
}

