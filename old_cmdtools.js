require('dotenv').config();
const DiscordJS = require('discord.js');
const fs = require('fs');

if (process.argv.length < 3) return console.log('\nnode cmdtools.js <post|del|list> <cmdname> [guildid]')

const Config = require('./src/config.js');

const operation = process.argv[2]

if (!['post', 'del', 'list'].includes(operation)) return console.log('Operação Inválida');

const Client = new DiscordJS.Client({ intents: Config.Discord.ClientIntents });

const InteractionCommands = fs.readdirSync('./src/commands/interactions/');
const Commands = new Set();

for (const CommandFile of InteractionCommands) Commands.add(require(`./src/commands/interactions/${CommandFile}`));

async function makereq() {
	await Client.login(process.env.DCTKN);
	if (!Client.application?.id) await Client.application?.fetch();
	const cmd = Array.from(Commands).find(Cmd => Cmd.data.name == process.argv[3]);
	if (cmd.scope === 'guild' && !process.argv[4]) return console.log('Você precisa especificar o ID do Servidor!')
	const CMDTools = cmd.scope === 'guild' ? Client.guilds.cache.get(process.argv[4])?.commands : Client.application?.commands;
	switch (operation) {
		case 'post':
			console.log(await CMDTools?.create(cmd.data))
			break;
		case 'del':
			const foundcmd = Array.from(await CMDTools.fetch(), ([, value]) => (value)).find(command => command.name === cmd.data.name);
			if (!foundcmd) return console.log('\nNão encontrei nenhum comando para deletar:\nNome do Comando: "'
				+ cmd.data.name + '"\n'
				+ 'Escopo: "' + cmd.scope + '"\n'
				+ (cmd.scope === 'guild' ? 'Servidor: "' + process.argv[4] + '"' : ''))
			console.log(await CMDTools?.delete(foundcmd.id))
			break;
		case 'list':
			console.log(await CMDTools?.fetch())
			break;
	}
}

makereq().then(() => { Client.destroy() });
