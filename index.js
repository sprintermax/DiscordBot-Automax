'use strict';

require('dotenv').config();
const DiscordJS = require('discord.js');
const Mongoose = require('mongoose');
const fs = require('fs');

const Config = require('./src/config.js');
const Schemas = require('./src/database/schemas.js');

const Client = new DiscordJS.Client({ intents: Config.Discord.ClientIntents });
Client.Commands = {
	Interactions: new DiscordJS.Collection(),
	Legacy: new DiscordJS.Collection()
}

Schemas.init(Mongoose);

const DiscordEvents = fs.readdirSync('./src/events/');
const InteractionCommands = fs.readdirSync('./src/commands/interactions/');
const LegacyCommands = fs.readdirSync('./src/commands/legacy/');

console.log('[TASK] Importação dos Eventos iniciada.');
if (DiscordEvents.length >= 1) {
	for (const EventFile of DiscordEvents) {
		const Event = require(`./src/events/${EventFile}`);
		Client.on(Event.defs.name, Event.run.bind(null, { DiscordJS, Client, Mongoose, Schemas }));
		console.log(`[LOAD] Evento "${Event.defs.name}" carregado com sucesso.`);
	}
} else console.log('[INFO] Nenhum Evento encontrado.');
console.log('[TASK] Importação dos Eventos finalizada.');

console.log('[TASK] Importação dos Comandos Interativos iniciada.');
if (InteractionCommands.length >= 1) {
	for (const CommandFile of InteractionCommands) {
		const Command = require(`./src/commands/interactions/${CommandFile}`);
		Client.Commands.Interactions.set(Command);
		console.log(`[LOAD] Comando Interativo "${Command.defs.name}" carregado com sucesso.`);
	}
} else console.log('[INFO] Nenhum Comando Interativo encontrado.');
console.log('[TASK] Importação dos Comandos Interativos finalizada.');

console.log('[TASK] Importação dos Comandos Legados iniciada.');
if (LegacyCommands.length >= 1) {
	for (const CommandFile of LegacyCommands) {
		const Command = require(`./src/commands/legacy/${CommandFile}`);
		Client.Commands.Legacy.set(Command);
		console.log(`[LOAD] Comando Legado "${Command.defs.name}" carregado com sucesso.`);
	}
} else console.log('[INFO] Nenhum Comando Legado encontrado.');
console.log('[TASK] Importação dos Comandos Legados finalizada.');

console.log('[CONNECTION] Iniciando Conexão com a Database.');
Mongoose.connect(process.env.MNGDB, {
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then(() => {
	console.log('[CONNECTION] Conectado a Database com sucesso!');
	Client.login(process.env.DCTKN);
});
