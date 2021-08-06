'use strict';

const { Intents, Permissions } = require('discord.js');

module.exports.Discord = {
	ClientIntents: [
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

module.exports.MongoDB = {
	ConnectionOptions: {
		useNewUrlParser: true,
		useUnifiedTopology: true
	}
}
