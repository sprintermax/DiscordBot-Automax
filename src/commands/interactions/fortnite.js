'use strict';

import { SlashCommandBuilder } from '@discordjs/builders';

// WIP | TEST COMMAND

export default {
	auto_update: false,
	data: new SlashCommandBuilder()
		.setName('fortnite')
		.setDescription('Comando para interações relacionadas ao Fortnite')
		.addSubcommandGroup((group) => group
			.setName('account')
			.setDescription('Conexão da sua conta do Fortnite com o Bot')
			.addSubcommand((subcmd) => subcmd
				.setName('info')
				.setDescription('Mostra informações sobre a conexão entre as contas')
			)
			.addSubcommand((subcmd) => subcmd
				.setName('link')
				.setDescription('Conecta uma conta do Fortnite com seu usuário do Discord no Bot')
				.addStringOption((option) => option
					.setName('nick')
					.setDescription('Seu Apelido da Epic Games')
					.setRequired(true)
				)
			)
			.addSubcommand((subcmd) => subcmd
				.setName('unlink')
				.setDescription('Desconecta a conta do Fortnite do seu Usuário no Bot')
			)
		)
		.addSubcommand((subcmd) => subcmd
			.setName('stats')
			.setDescription('Veja estatísticas do Fortnite suas ou de outros jogadores')
			.addStringOption((option) => option
				.setName('nick')
				.setDescription('Apelido no Fortnite')
			)
			.addStringOption((option) => option
				.setName('platform')
				.setDescription('Especifique sua plataforma caso seu apelido não seja da Epic Games')
				.addChoices([
					['Xbox', 'xbl'],
					['Playstation', 'psn']
				])
			)
		)
		.addSubcommandGroup((group) => group
			.setName('reminder')
			.setDescription('Gerencia lembretes para ser notificado quando um item estiver na loja de Itens')
			.addSubcommand((subcmd) => subcmd
				.setName('list')
				.setDescription('Mostra os itens atualmente na sua lista de lembretes')
			)
			.addSubcommand((subcmd) => subcmd
				.setName('remove')
				.setDescription('Remove um item da sua lista de lembretes')
				.addStringOption((option) => option
					.setName('id')
					.setDescription('ID do Item da lista de lembretes')
					.setRequired(true)
				)
			)
		)
		.addSubcommand((subcmd) => subcmd
			.setName('brshop')
			.setDescription('Mostra uma imagem da Loja de Itens atual do Fortnite')
			.addStringOption((option) => option
				.setName('lang')
				.setDescription('Caso você não queira a loja exibida em Português, espeficique um idioma')
				.addChoices([
					['English', 'en'],
					['Spanish', 'es'],
					['French', 'fr'],
					['Italian', 'it']
				])
			)
		)
		.addSubcommand((subcmd) => subcmd
			.setName('cosmetic')
			.setDescription('Procura e exibe informações sobre algum item do Fortnite de acordo com os critérios de busca')
			.addStringOption((option) => option
				.setName('name')
				.setDescription('O Nome do Item em Português ou Inglês para pesquisar')
			)
			.addStringOption((option) => option
				.setName('id')
				.setDescription('ID do Item para pesquisar')
			)
			.addStringOption((option) => option
				.setName('description')
				.setDescription('A Descrição do Item em Português ou Inglês para pesquisar')
			)
			.addStringOption((option) => option
				.setName('set')
				.setDescription('O Conjunto do Item em Português ou Inglês para pesquisar')
			)
			.addStringOption((option) => option
				.setName('method')
				.setDescription('Por padrão o método de procura do item é "Contém", caso queira procurar de outro jeito, especifique')
				.addChoices([
					['Full Match', 'full'],
					['Starts With', 'starts'],
					['Ends With', 'ends']
				])
			)
			.addStringOption((option) => option
				.setName('type')
				.setDescription('Filtra a busca de itens por tipo')
				.addChoices([
					['Outfit', 'outfit'],
					['Emote', 'emote'],
					['Glider', 'glider'],
					['Harvest Tool', 'pickaxe'],
					['Wrap', 'wrap'],
					['Contrail', 'contrail'],
					['Toy', 'toy'],
					['Banner', 'banner'],
					['Emoji', 'emoji'],
					['Spray', 'spray'],
					['Pet Carrier', 'petcarrier'],
					['Loading Screen', 'loadingscreen'],
					['Music', 'music']
				])
			)
			.addStringOption((option) => option
				.setName('rarity')
				.setDescription('Filtra a busca de itens por raridade')
				.addChoices([
					['Common', 'common'],
					['Rare', 'rare'],
					['Epic', 'epic'],
					['Legendary', 'legendary'],
					['Exotic', 'exotic'],
					['Mythic', 'mythic']
				])
			)
			.addStringOption((option) => option
				.setName('serie')
				.setDescription('Filtra a busca de itens por série')
				.addChoices([
					['Star Wars', 'starwars'],
					['Icon', 'icon'],
					['Dark', 'cube'],
					['DC', 'dc'],
					['Marvel', 'marvel'],
					['Frozen', 'frozen'],
					['Lava', 'lava'],
					['Game Legends', 'game'],
					['Slurp', 'slurp'],
					['Shadow', 'shadow']
				])
			)
		)
		.addSubcommand((subcmd) => subcmd
			.setName('stwalerts')
			.setDescription('Mostra uma imagem com os principais alertas do Salve o Mundo')
			.addStringOption((option) => option
				.setName('lang')
				.setDescription('Espeficique um idioma caso você não queira uma resposta em Português')
				.addChoices([
					['English', 'en'],
					['Spanish', 'es'],
					['French', 'fr'],
					['Italian', 'it']
				])
			)
		),
	async run({ Client, Interaction }) {

	}
}

