'use strict';

// WIP | TEST COMMAND

module.exports = {
	scope: 'global',
	data: {
		name: 'fortnite',
		description: 'Comando para interações relacionadas ao Fortnite',
		options: [
			{
				name: 'account',
				description: 'Conexão da sua conta do Fortnite com o Bot',
				type: 'SUB_COMMAND_GROUP',
				options: [
					{
						name: 'info',
						description: 'Mostra informações sobre a conexão entre as contas',
						type: 'SUB_COMMAND'
					},
					{
						name: 'link',
						description: 'Conecta uma conta do Fortnite com seu usuário do Discord no Bot',
						type: 'SUB_COMMAND',
						options: [
							{
								name: 'nick',
								description: 'Seu Apelido da Epic Games',
								type: 'STRING',
								required: true
							}
						]
					},
					{
						name: 'unlink',
						description: 'Desconecta a conta do Fortnite do seu Usuário no Bot',
						type: 'SUB_COMMAND'
					}
				]
			},
			{
				name: 'stats',
				description: 'Veja estatísticas do Fortnite suas ou de outros jogadores',
				type: 'SUB_COMMAND',
				options: [
					{
						name: 'nick',
						description: 'Seu Apelido no Fortnite',
						type: 'STRING'
					},
					{
						name: 'platform',
						description: 'Especifique sua plataforma caso seu apelido não seja da Epic Games',
						type: 'STRING',
						choices: [
							{
								name: "Xbox",
								value: "xbl"
							},
							{
								name: "Playstation",
								value: "psn"
							}
						]
					}
				]
			},
			{
				name: 'reminder',
				description: 'Gerencia lembretes para ser notificado quando um item estiver na loja de Itens',
				type: 'SUB_COMMAND_GROUP',
				options: [
					{
						name: 'list', // usar o resultado do comando /fortnite cosmetic para adicionar um item. com opção de persistente ou não
						description: 'Mostra os itens atualmente na sua lista de lembretes',
						type: 'SUB_COMMAND'
					},
					{
						name: 'remove',
						description: 'Remove um item da sua lista de lembretes',
						type: 'SUB_COMMAND',
						options: [
							{
								name: 'id',
								description: 'ID do Item da lista de lembretes',
								type: 'STRING',
								required: true
							}
						]
					}
				]
			},
			{
				name: 'brshop',
				description: 'Mostra uma imagem da Loja de Itens atual do Fortnite',
				type: 'SUB_COMMAND',
				options: [
					{
						name: 'lang',
						description: 'Caso você não queira a loja exibida em Português, espeficique um idioma',
						type: 'STRING',
						choices: [
							{
								name: "english",
								value: "en"
							},
							{
								name: "spanish",
								value: "es"
							},
							{
								name: "french",
								value: "fr"
							},
							{
								name: "italian",
								value: "it"
							}
						]
					}
				]
			},
			{
				name: 'cosmetic',
				description: 'Procura e exibe informações sobre algum item do Fortnite de acordo com os critérios de busca',
				type: 'SUB_COMMAND',
				options: [
					{
						name: 'name',
						description: 'O Nome do Item em Português ou Inglês para pesquisar',
						type: 'STRING'
					},
					{
						name: 'id',
						description: 'ID do Item para pesquisar',
						type: 'STRING'
					},
					{
						name: 'description',
						description: 'A Descrição do Item em Português ou Inglês para pesquisar',
						type: 'STRING'
					},
					{
						name: 'set',
						description: 'O Conjunto do Item em Português ou Inglês para pesquisar',
						type: 'STRING'
					},
					{
						name: 'method',
						description: 'Por padrão o método de procura do item é "Contém", caso queira procurar de outro jeito, especifique',
						type: 'STRING',
						choices: [
							{
								name: "Full Match",
								value: "full"
							},
							{
								name: "Starts With",
								value: "starts"
							},
							{
								name: "Ends With",
								value: "ends"
							}
						]
					},
					{
						name: 'type',
						description: 'Filtra a busca de itens por tipo',
						type: 'STRING',
						choices: [
							{
								name: "Outfit",
								value: "outfit"
							},
							{
								name: "Emote",
								value: "emote"
							},
							{
								name: "Glider",
								value: "glider"
							},
							{
								name: "Harvest Tool",
								value: "pickaxe"
							},
							{
								name: "Wrap",
								value: "wrap"
							},
							{
								name: "Contrail",
								value: "contrail"
							},
							{
								name: "Toy",
								value: "spray"
							},
							{
								name: "Banner",
								value: "banner"
							},
							{
								name: "Emoji",
								value: "emoji"
							},
							{
								name: "Spray",
								value: "spray"
							},
							{
								name: "Pet Carrier",
								value: "petcarrier"
							},
							{
								name: "Loading Screen",
								value: "loadingscreen"
							},
							{
								name: "Music",
								value: "music"
							}
						]
					},
					{
						name: 'rarity',
						description: 'Filtra a busca de itens por raridade ou série',
						type: 'STRING',
						choices: [
							{
								name: "Common",
								value: "rarity_common"
							},
							{
								name: "Rare",
								value: "rarity_rare"
							},
							{
								name: "Epic",
								value: "rarity_epic"
							},
							{
								name: "Legendary",
								value: "rarity_legendary"
							},
							{
								name: "Exotic",
								value: "rarity_exotic"
							},
							{
								name: "Mythic",
								value: "rarity_mythic"
							},
							{
								name: "Star Wars Series",
								value: "serie_starwars"
							},
							{
								name: "Icon Series",
								value: "serie_icon"
							},
							{
								name: "Dark Series",
								value: "serie_cube"
							},
							{
								name: "DC Series",
								value: "serie_dc"
							},
							{
								name: "Marvel Series",
								value: "serie_marvel"
							},
							{
								name: "Frozen Series",
								value: "serie_frozen"
							},
							{
								name: "Lava Series",
								value: "serie_lava"
							},
							{
								name: "Game Legends Series",
								value: "serie_game"
							},
							{
								name: "Slurp Series",
								value: "serie_slurp"
							},
							{
								name: "Shadow Series",
								value: "serie_shadow"
							}
						]
					}
				]
			},
			{
				name: 'stwalerts',
				description: 'Mostra uma imagem com os principais alertas do Salve o Mundo',
				type: 'SUB_COMMAND',
				options: [
					{
						name: 'lang',
						description: 'Espeficique um idioma caso você não queira uma resposta em Português',
						type: 'STRING',
						choices: [
							{
								name: "English",
								value: "en"
							},
							{
								name: "Spanish",
								value: "es"
							},
							{
								name: "French",
								value: "fr"
							},
							{
								name: "Italian",
								value: "it"
							}
						]
					}
				]
			}
		]
	},
	async run({ Runtime, Interaction }) {

	}
}

