'use strict';

const Config = require('../config.js');

exports.defs = {
	name: 'ready'
}

exports.run = async ({ DiscordJS, Client, Mongoose, Schemas }) => {

	console.log(`[CONNECTION] O Bot está online em ${Client.guilds.size} Servidores pelo usuário "${Client.user.tag}" (${Client.user.id})`);
	const InviteLink = Client.generateInvite({ scopes: ['bot'], permissions: Config.Discord.InvitePerms });
	console.log(`[INFO] Link de convite do Bot: ${InviteLink}`);
}
