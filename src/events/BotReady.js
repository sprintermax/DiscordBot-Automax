'use strict';

import * as Config from '../config.js';

export default {
	name: 'ready',
	run(Client) {
		console.log(`[CONNECTION] O Bot está online em ${Client.guilds.cache.size} servidor${Client.guilds.cache.size > 1 ? 'es' : ''} pelo usuário "${Client.user.tag}" (${Client.user.id})\n`);
		const InviteLink = Client.generateInvite({ scopes: ['bot', 'applications.commands'], permissions: Config.Discord.InvitePerms });
		console.log(`[INFO] Link de convite: ${InviteLink}\n`);
	}
}
