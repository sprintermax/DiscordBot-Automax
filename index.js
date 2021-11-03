'use strict';

import dotenv from 'dotenv';
dotenv.config();

import DiscordJS from 'discord.js';
import Mongoose from 'mongoose';
import fs from 'fs';

import './src/database/schemas.js';
import * as Config from './src/config.js';
import HandleError from './src/utils/HandleError.js';

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
		const Event = await import(`./src/events/${EventFile}`).then(Event => Event.default);
		Client.on(Event.name, Event.run.bind(null, Client));
		console.log(`[LOAD] Evento "${Event.name}" carregado com sucesso.`);
	}
	console.log('[TASK] Importação dos eventos finalizada.\n');
} else console.log('[INFO] Nenhum evento encontrado.\n');

const DiscordOnceEvents = fs.existsSync('./src/events/once/') ? fs.readdirSync('./src/events/once/') : [];
if (DiscordOnceEvents.length > 0) {
	console.log('[TASK] Importação dos eventos de execução única iniciada.');
	for (const EventFile of DiscordOnceEvents) {
		if (!EventFile.endsWith('.js')) continue;
		const Event = await import(`./src/events/once/${EventFile}`).then(Event => Event.default);
		Client.once(Event.name, Event.run.bind(null, Client));
		console.log(`[LOAD] Evento de execução única "${Event.name}" carregado com sucesso.`);
	}
	console.log('[TASK] Importação dos eventos de execução única finalizada.\n');
} else console.log('[INFO] Nenhum evento de execução única encontrado.\n');

const InteractionCommands = fs.existsSync('./src/commands/interactions/') ? fs.readdirSync('./src/commands/interactions/') : [];
if (InteractionCommands.length > 0) {
	console.log('[TASK] Importação dos comandos interativos iniciada.');
	for (const CommandFile of InteractionCommands) {
		if (!CommandFile.endsWith('.js')) continue;
		const Command = await import(`./src/commands/interactions/${CommandFile}`).then(Command => Command.default);
		Client.Commands.Interactions.set(Command.data.name, Command);
		console.log(`[LOAD] Comando interativo "${Command.data.name}" carregado com sucesso.`);
	}
	console.log('[TASK] Importação dos comandos interativos finalizada.\n');
} else console.log('[INFO] Nenhum comando interativo encontrado.\n');

const LegacyCommands = fs.existsSync('./src/commands/legacy/') ? fs.readdirSync('./src/commands/legacy/') : [];
if (LegacyCommands.length > 0) {
	console.log('[TASK] Importação dos comandos legados iniciada.');
	for (const CommandFile of LegacyCommands) {
		if (!CommandFile.endsWith('.js')) continue;
		const Command = await import(`./src/commands/legacy/${CommandFile}`).then(Command => Command.default);
		Client.Commands.Legacy.set(Command.name, Command);
		console.log(`[LOAD] Comando legado "${Command.name}" carregado com sucesso.`);
	}
	console.log('[TASK] Importação dos Comandos legados finalizada.\n');
} else console.log('[INFO] Nenhum comando legado encontrado.\n');

console.log('[CONNECTION] Iniciando conexão com a database.');
Mongoose.connect(process.env.MNGDB, Config.MongoDB.ConnectionOptions).then(async () => {
	console.log('[CONNECTION] Conectado a database com sucesso.\n');

	try {
		await Client.login(process.env.DCTKN);
	} catch (Err) {
		HandleError({ ProgErr: Err });
	}

	process.on('SIGINT', function () {
		Client.destroy();
		Mongoose.disconnect();
		process.exit();
	});
});
