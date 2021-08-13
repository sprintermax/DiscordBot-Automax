'use strict';

require('dotenv').config();
const DiscordJS = require('discord.js');
const Mongoose = require('mongoose');
const fs = require('fs');

const Config = require('./src/config.js');
const HandleError = require('./src/utils/HandleError.js');
const Schemas = require('./src/database/schemas.js').init(Mongoose);

const FortniteClient = require('./src/clients/fnclient.js');
const { FNClient } = FortniteClient;

const Client = new DiscordJS.Client({ intents: Config.Discord.ClientIntents });
Client.Commands = {
	Interactions: new DiscordJS.Collection(),
	Legacy: new DiscordJS.Collection()
}

const DiscordEvents = fs.existsSync('./src/events/') ? fs.readdirSync('./src/events/') : [];
if (DiscordEvents.length > 0) {
	console.log('[TASK] Importação dos Eventos iniciada.');
	for (const EventFile of DiscordEvents) {
		if (!EventFile.endsWith('.js')) continue;
		const Event = require(`./src/events/${EventFile}`);
		Client.on(Event.name, Event.run.bind(null, { DiscordJS, Client, Mongoose, Schemas }));
		console.log(`[LOAD] Evento "${Event.name}" carregado com sucesso.`);
	}
	console.log('[TASK] Importação dos Eventos finalizada.\n');
} else console.log('[INFO] Nenhum Evento encontrado.\n');

const InteractionCommands = fs.existsSync('./src/commands/interactions/') ? fs.readdirSync('./src/commands/interactions/') : [];
if (InteractionCommands.length > 0) {
	console.log('[TASK] Importação dos Comandos Interativos iniciada.');
	for (const CommandFile of InteractionCommands) {
		if (!CommandFile.endsWith('.js')) continue;
		const Command = require(`./src/commands/interactions/${CommandFile}`);
		Client.Commands.Interactions.set(Command.data.name, Command);
		console.log(`[LOAD] Comando Interativo "${Command.data.name}" carregado com sucesso.`);
	}
	console.log('[TASK] Importação dos Comandos Interativos finalizada.\n');
} else console.log('[INFO] Nenhum Comando Interativo encontrado.\n');

const LegacyCommands = fs.existsSync('./src/commands/legacy/') ? fs.readdirSync('./src/commands/legacy/') : [];
if (LegacyCommands.length > 0) {
	console.log('[TASK] Importação dos Comandos Legados iniciada.');
	for (const CommandFile of LegacyCommands) {
		if (!CommandFile.endsWith('.js')) continue;
		const Command = require(`./src/commands/legacy/${CommandFile}`);
		Client.Commands.Legacy.set(Command.name, Command);
		console.log(`[LOAD] Comando Legado "${Command.name}" carregado com sucesso.`);
	}
	console.log('[TASK] Importação dos Comandos Legados finalizada.\n');
} else console.log('[INFO] Nenhum Comando Legado encontrado.\n');

console.log('[CONNECTION] Iniciando Conexão com a Database.');
Mongoose.connect(process.env.MNGDB, Config.MongoDB.ConnectionOptions).then(async () => {
	console.log('[CONNECTION] Conectado a Database com sucesso.\n');
	try {
		await FortniteClient.init();
	} catch (Err) {
		HandleError({ ProgErr: Err });
	}
	await Client.login(process.env.DCTKN);

	process.on('SIGINT', function () {
		Client.destroy();
		FNClient.logout();
		Mongoose.disconnect();
		process.exit();
	});
});
