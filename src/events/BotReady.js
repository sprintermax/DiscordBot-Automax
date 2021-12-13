'use strict';

import HandleError from '../utils/HandleError.js';
import * as Config from '../config.js';

export default {
	name: 'ready',
	async runOnce(Client) {
		try {
			const LocalCommands = Client.Commands.Interactions
				.filter(Command => Command.auto_update === true)
				.map(Command => Command.data);
			if (LocalCommands.length > 0) {
				console.log('[TASK] Atualização dos comandos interativos iniciada.');
				await Client.application?.commands.set(LocalCommands)
					.then(ClientCommands => {
						for (const Command of ClientCommands.values()) {
							console.log(`[LOAD] Comando interativo "${Command.name}" atualizado com sucesso.`);
						}
					})
					.catch(Err => HandleError({ ProgErr: Err }));
				console.log('[TASK] Atualização dos comandos interativos finalizada.\n');
			} else console.log('[INFO] Nenhum comando interativo a ser atualizado.\n');
		} catch (Err) {
			HandleError({ ProgErr: Err });
		}
	},
	async run(Client) {
		console.log(`[CONNECTION] O Bot está online em ${Client.guilds.cache.size} servidor${Client.guilds.cache.size > 1 ? 'es' : ''} pelo usuário "${Client.user.tag}" (${Client.user.id})\n`);
		const InviteLink = Client.generateInvite({ scopes: ['bot', 'applications.commands'], permissions: Config.Discord.InvitePerms });
		console.log(`[INFO] Link de convite: ${InviteLink}\n`);
	}
}
