'use strict';

import HandleError from '../utils/HandleError.js';

//EVERYTHING HERE IS TEMPORARY

export default {
	name: 'messageCreate',
	async run(Client, message) {
		//await Client.Commands.Legacy.get(message.content).run({ DiscordJS, Client, Mongoose, Schemas, message });

		let CommandName = message.content;
		let cmd = ''
		let args = ''
		try {
			if (Client.Commands.Legacy.has(CommandName)) {
				await Client.Commands.Legacy.get(CommandName)
					.run({ Client, message, args, cmd });
			}
		} catch (Err) {
			HandleError({ Client, message, Err });
		}
	}
}
