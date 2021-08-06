'use strict';

const Config = require('../config.js');

module.exports = {
	name: 'ready',
	run({ Client }) {
		console.log(`[CONNECTION] O Bot está online em ${Client.guilds.cache.size} servidor${Client.guilds.cache.size > 1 ? 'es' : ''} pelo usuário "${Client.user.tag}" (${Client.user.id})`);
		const InviteLink = Client.generateInvite({ scopes: ['bot', 'applications.commands'], permissions: Config.Discord.InvitePerms });
		console.log(`[INFO] Link de convite do Bot: ${InviteLink}\n`);
	}
}
