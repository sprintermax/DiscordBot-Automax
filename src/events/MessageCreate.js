'use strict';

const DiscordJS = require('discord.js');
const Mongoose = require('mongoose');

const Schemas = require('../database/schemas.js')

module.exports = {
	name: 'messageCreate',
	async run(Client, message) {
		//await Client.Commands.Legacy.get(message.content).run({ DiscordJS, Client, Mongoose, Schemas, message });
	}
}
