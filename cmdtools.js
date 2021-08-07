require('dotenv').config();
const DiscordJS = require('discord.js');
const fs = require('fs');

if (process.argv.length < 3) return console.log('\nnode cmdtools.js <post|del|list> <global|guild> <guildid> <cmdname>')

const Config = require('./src/config.js');

const operation = process.argv[2]
const cmdscope = process.argv[3]

if (!['post', 'del', 'list'].includes(operation)) return console.log('Operação Inválida');
if (!['global', 'guild'].includes(cmdscope)) return console.log('Escopo do Comando Inválida');

const Client = new DiscordJS.Client({ intents: Config.Discord.ClientIntents });

const InteractionCommands = fs.readdirSync('./src/commands/interactions/');
const Commands = new Set();

for (const CommandFile of InteractionCommands) {
	const Command = require(`./src/commands/interactions/${CommandFile}`);
	Commands.add(Command.data);
}

async function makereq() {
	await Client.login(process.env.DCTKN);
	if (!Client.application?.id) await Client.application?.fetch();
	const CMDTools = cmdscope == 'guild' ? Client.guilds.cache.get(process.argv[4])?.commands : Client.application?.commands;
	const cmdname = cmdscope == 'guild' ? process.argv[5] : process.argv[4];
	const cmddata = Array.from(Commands).find(Cmd => Cmd.name == cmdname);
	switch (operation) {
		case 'post':
			console.log(await CMDTools?.create(cmddata))
			break;
		case 'del':
			console.log(await CMDTools?.delete(cmddata))
			break;
		case 'list':
			console.log(await CMDTools?.fetch())
			break;
	}
	await Client.destroy();
}

makereq();
