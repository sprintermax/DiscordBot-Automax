'use strict';

import { Intents, Permissions } from 'discord.js';

export const Discord = {
	ClientIntents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
		Intents.FLAGS.DIRECT_MESSAGES,
		Intents.FLAGS.DIRECT_MESSAGE_REACTIONS
	],
	InvitePerms: [
		Permissions.FLAGS.SEND_MESSAGES,
		Permissions.FLAGS.VIEW_CHANNEL,
		Permissions.FLAGS.ADMINISTRATOR // Temp just for easy tests
	]
}

export const MongoDB = {
	ConnectionOptions: {
		useNewUrlParser: true,
		useUnifiedTopology: true
	}
}
