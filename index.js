'use strict';

require('dotenv').config();
const DiscordJS = require('discord.js');
const Mongoose = require('mongoose');
const fs = require('fs');

require('./src/database/schemas.js')
const Config = require('./src/config.js');
const HandleError = require('./src/utils/HandleError.js');

const FortniteClient = require('./src/clients/fnclient.js');
const { FNClient } = FortniteClient;

const Client = new DiscordJS.Client({ intents: Config.Discord.ClientIntents });
Client.Commands = {
	Interactions: new DiscordJS.Collection(),
	Legacy: new DiscordJS.Collection()
}

const DiscordEvents = fs.existsSync('./src/events/') ? fs.readdirSync('./src/events/') : [];
if (DiscordEvents.length > 0) {
	console.log('[TASK] Importação dos eventos iniciada.');
	for (const EventFile of DiscordEvents) {
		if (!EventFile.endsWith('.js')) continue;
		const Event = require(`./src/events/${EventFile}`);
		Client.on(Event.name, Event.run.bind(null, Client));
		console.log(`[LOAD] Evento "${Event.name}" carregado com sucesso.`);
	}
	console.log('[TASK] Importação dos eventos finalizada.\n');
} else console.log('[INFO] Nenhum evento encontrado.\n');

const InteractionCommands = fs.existsSync('./src/commands/interactions/') ? fs.readdirSync('./src/commands/interactions/') : [];
if (InteractionCommands.length > 0) {
	console.log('[TASK] Importação dos comandos interativos iniciada.');
	for (const CommandFile of InteractionCommands) {
		if (!CommandFile.endsWith('.js')) continue;
		const Command = require(`./src/commands/interactions/${CommandFile}`);
		Client.Commands.Interactions.set(Command.data.name, Command);
		console.log(`[LOAD] comando interativo "${Command.data.name}" carregado com sucesso.`);
	}
	console.log('[TASK] Importação dos comandos interativos finalizada.\n');
} else console.log('[INFO] Nenhum comando interativo encontrado.\n');

const LegacyCommands = fs.existsSync('./src/commands/legacy/') ? fs.readdirSync('./src/commands/legacy/') : [];
if (LegacyCommands.length > 0) {
	console.log('[TASK] Importação dos comandos legados iniciada.');
	for (const CommandFile of LegacyCommands) {
		if (!CommandFile.endsWith('.js')) continue;
		const Command = require(`./src/commands/legacy/${CommandFile}`);
		Client.Commands.Legacy.set(Command.name, Command);
		console.log(`[LOAD] comando legado "${Command.name}" carregado com sucesso.`);
	}
	console.log('[TASK] Importação dos Comandos legados finalizada.\n');
} else console.log('[INFO] Nenhum comando legado encontrado.\n');

console.log('[CONNECTION] Iniciando conexão com a database.');
Mongoose.connect(process.env.MNGDB, Config.MongoDB.ConnectionOptions).then(async () => {
	console.log('[CONNECTION] Conectado a database com sucesso.\n');
	try {
		await FortniteClient.init();
	} catch (Err) {
		HandleError({ ProgErr: Err });
	}
	try {
		await Client.login(process.env.DCTKN);
	} catch (Err) {
		HandleError({ ProgErr: Err });
	}

	process.on('SIGINT', function () {
		Client.destroy();
		FNClient.logout();
		Mongoose.disconnect();
		process.exit();
	});
});
