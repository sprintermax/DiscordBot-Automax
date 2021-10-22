'use strict';
import ytdl from 'ytdl-core';
import ytsc from 'yt-search';

import { SlashCommandBuilder } from '@discordjs/builders';

const Queue = new Map();

// Play[list] - Pause - Resume - Skip[vote] - Remove - Move - nowplaying - join - leave - queue
//? Loop - Volume

export default {
	scope: 'guild',
	data: new SlashCommandBuilder()
		.setName('song')
		.setDescription('Comando relacionado a reprodução de audios através do Youtube')
		.addSubcommand((subcmd) => subcmd
			.setName('play')
			.setDescription('Adiciona um vídeo na lista de reprodução do bot')
			.addStringOption((option) => option
				.setName('video')
				.setDescription('Link do vídeo, playlist ou texto para busca')
				.setRequired(true)
			)
		)
		.addSubcommand((subcmd) => subcmd
			.setName('pause')
			.setDescription('Pausa a reprodução do bot')
		)
		.addSubcommand((subcmd) => subcmd
			.setName('resume')
			.setDescription('Retoma a reprodução do bot')
		)
		.addSubcommand((subcmd) => subcmd
			.setName('skip')
			.setDescription('Pula o que está em reprodução no momento')
		)
		.addSubcommand((subcmd) => subcmd
			.setName('remove')
			.setDescription('Remove algum item da lista de reprodução')
			.addIntegerOption((option) => option
				.setName('id')
				.setDescription('Posição do vídeo na lista de reprodução a ser removido')
				.setRequired(true)
			)
		)
		.addSubcommand((subcmd) => subcmd
			.setName('queue')
			.setDescription('Mostra a lista de reprodução atual')
		)
		.addSubcommand((subcmd) => subcmd
			.setName('move')
			.setDescription('Altera a posição de um vídeo da lista de reprodução')
			.addIntegerOption((option) => option
				.setName('from')
				.setDescription('ID do vídeo na playlist a ser movido')
				.setRequired(true)
			)
			.addIntegerOption((option) => option
				.setName('to')
				.setDescription('Posição na playlist em que o vídeo irá ficar')
				.setRequired(true)
			)
		)
		.addSubcommand((subcmd) => subcmd
			.setName('join')
			.setDescription('Entra no chat de voz que você está ou que foi especificado')
			.addChannelOption((option) => option
				.setName('channel')
				.setDescription('Canal de voz para o bot entrar')
			)
		)
		.addSubcommand((subcmd) => subcmd
			.setName('leave')
			.setDescription('Sai do chat de voz atual se o bot estiver em um')
		),
	async run({ Client, Interaction }) {
		const VoiceChannel = Interaction.options.getChannel('channel') || Interaction.member.voice.channel;
		console.log(VoiceChannel)
	}
}

