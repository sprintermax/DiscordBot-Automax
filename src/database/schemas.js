'use strict';

module.exports.init = (Mongoose) => {

	console.log('[TASK] Importação de Schemas iniciada.');

	// Emblem Data Schema

	const EmblemData = new Mongoose.Schema({
		id: { type: Number, required: true },
		name: { type: String, required: true },
		desc: { type: String },
		image: { type: String },
		type: { type: String, required: true },
		created: { type: String, default: Date.now() },
		members: [{ type: String }]
	});
	console.log('[LOAD] "Mongoose: EmblemData" carregado.');

	// Inventory Item Schema

	const InventoryItem = new Mongoose.Schema({
		id: { type: Number, required: true },
		type: { type: String, required: true },
		count: { type: Number, default: 0 },
		data: { type: Object }
	});
	console.log('[LOAD] "Mongoose: InventoryItem" carregado.');

	// User Data Schema

	const UserData = new Mongoose.Schema({
		userid: { type: String, required: true },
		profile: {
			created: { type: Date, default: Date.now() },
			viewcount: { type: Number, default: 0 },
			karma: { type: Number, default: 0 },
			exp: { type: Number, default: 0 }
		},/*
		economy: {
			money: { type: Number, default: 0 },
			eventcoins: { type: Number, default: 0 }
		},
		inventory: [InventoryItem]*/
	});
	console.log('[LOAD] "Mongoose: UserData" carregado com sucesso.');

	// Codes Schema

	const GuildCodeData = new Mongoose.Schema({
		code: { type: String, required: true },
		created: { type: String, default: Date.now() },
		members: [{ type: String }],
		grants: [{ type: Object, required: true }],
		config: {
			maxuses: { type: String, default: 'infinite' },
			redeem: {
				method: { type: String, default: 'onlyself' }, // onlyself | onlygift | onlyvip | 
				gifting: {
					consumeon: { type: String, default: 'sender' }, // sender | receiver
					allowed: { type: Boolean, default: false },
					tononvip: { type: Boolean, default: false }, // If a vip member can redeem as a gift for a non-vip member
					fromnonvip: { type: Boolean, default: true } // If a non-vip member can redeem as a Gift for a VIP member
				},
				whitelist: {
					users: [{ type: String }],
					roles: [{ type: String }]
				},
				blacklist: {
					users: [{ type: String }],
					roles: [{ type: String }]
				}
			},
			expires: {
				autodelete: { type: Boolean, default: true },
				afterdate: { type: String, default: 'never' },
				afteruses: { type: Number, default: -1 }
			}
		}
	});
	console.log('[LOAD] "Mongoose: GuildCodeData" carregado com sucesso.')

	// Guild Data Schema and Model

	exports.GuildDB = new Mongoose.model("Guilds", Mongoose.Schema({
		guildid: { type: String, required: true },
		config: {
			features: {
				fnshop: { type: Boolean, default: false },
				badwords: {
					enabled: { type: Boolean, default: false },
					logchannel: { type: String, default: 0 },
					whitelist: {
						strings: [{ type: String }],
						channels: [{ type: String }],
						users: [{ type: String }],
						roles: [{ type: String }]
					},
					blacklist: {
						strings: [{ type: String }],
						channels: [{ type: String }],
						users: [{ type: String }],
						roles: [{ type: String }]
					}
				},
				leveling: {
					enabled: { type: Boolean, default: false },
					logchannel: { type: String, default: 0 },
					xpammount: { type: Number, default: 3 },
					vipmultiplier: { type: Number, default: 1 },
					whitelist: {
						channels: [{ type: String }],
						users: [{ type: String }],
						roles: [{ type: String }]
					},
					blacklist: {
						channels: [{ type: String }],
						users: [{ type: String }],
						roles: [{ type: String }]
					}
				}/*
					economy: {
						enabled: { type: Boolean, default: false },
						bankmoney: { type: Number, default: 0 },
						guildshop: [GuildShopItem], // WIP - TO DO
						tradefeepercent: { type: Number, default: 5 },
						logchannels: {
							shop: { type: String, default: 0 },
							trade: { type: String, default: 0 }
						},
						vip: {
							dailymultiplier: { type: Number, default: 1 },
							tradefeepercent: { type: Number, default: 2.5 },
						},
						dailyrange: {
							min: { type: Number, default: 100 },
							max: { type: Number, default: 250 }
						},
						whitelist: {
							channels: [{ type: String }],
							users: [{ type: String }],
							roles: [{ type: String }]
						},
						blacklist: {
							channels: [{ type: String }],
							users: [{ type: String }],
							roles: [{ type: String }]
						}
					}*/
			},
			vips: {
				roles: [{ type: String }],
				users: [{ type: String }]
			},
			chatlogs: {
				punishment: { type: String, default: 0 },
				fnbrshop: { type: String, default: 0 }
			}
		},
		redeemcodes: [GuildCodeData],
		delays: {
			karmausers: [{ type: String }]/*,
			dailyusers: [{ type: String }]*/
		},
		profiles: [UserData]/*,
		emblems: [EmblemData]*/
	}));
	console.log('[LOAD] "Mongoose: GuildDB" carregado com sucesso.')

	// Emblem Data Schema

	const FNItemReminderData = new Mongoose.Schema({
		itemid: { type: String, required: true },
		fnitemid: { type: String, required: true },
		persistent: { type: Boolean, default: false },
		created: { type: String, default: Date.now() }
	});
	console.log('[LOAD] "Mongoose: FNItemReminderData" carregado.');

	// Linked Services Schemas and Model

	exports.UserLinksDB = new Mongoose.model("UserLinkedAccounts", Mongoose.Schema({
		userid: { type: String },
		fortnite: {
			accountid: { type: String },
			linkeddate: { type: Date },
			shopreminders: [FNItemReminderData]
		},
		minecraft: {
			username: { type: String },
			linkeddate: { type: Date }
		}
	}));
	console.log('[LOAD] "Mongoose: UserLinksDB" carregado com sucesso.')

	console.log('[TASK] Importação de Schemas finalizada.\n');
};
