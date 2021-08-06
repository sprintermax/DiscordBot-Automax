'use strict';

module.exports.init = (mongoose) => {

	// User Data Schema

	let userdata = new mongoose.model(
		"users", mongoose.Schema({
			userid: { type: String, default: 0 },
			guildid: { type: String, default: 0 },
			profileviewcount: { type: Number, default: 0 },
			upvotes: {
				confianca: { type: Number, default: 0 },
				karma: { type: Number, default: 0 }
			},
			leveling: {
				level: { type: Number, default: 0 },
				exp: { type: Number, default: 0 }
			},
			economy: {
				money: { type: Number, default: 0 },
				flixcoins: { type: Number, default: 0 },
				fragments: { type: Number, default: 0 }
			},
			delays: {
				daily: { type: Date, default: Date.now },
				karma: { type: Date, default: Date.now }
			},
			fnlinkednick: { type: String, default: '' },
			inventory: {
				figurinhas: [{ type: String }],
				emblemas: [{ type: Number }],
				itens: { type: Array }/*,
                {
                    id: 1,
                    type: 'cardpack',
                    rarity: 'epic',
                    count: 3
                }*/
			}
		}
		));
	exports.DBUser = userdata;
	console.log('[LOAD] "Userdata Schema" carregado com sucesso.')

	// Guild Data Schema

	let guilddata = new mongoose.model(
		"guilds", mongoose.Schema({
			guildid: { type: String, default: 0 },
			config: {
				prefix: { type: String, default: 'f!' },
				cmdwait: {
					time: { type: Number, default: 3 },
					whitelist: {
						channels: { type: Array },
						users: { type: Array },
						roles: { type: Array }
					},
					blacklist: {
						channels: { type: Array },
						users: { type: Array },
						roles: { type: Array }
					}
				},
				logchats: {
					guildshop: { type: String, default: 0 },
					fnshop: { type: String, default: 0 },
					badwords: { type: String, default: 0 },
					leveling: { type: String, default: 0 },
					punishment: { type: String, default: 0 },
					membertrade: { type: String, default: 0 }
				}
			},
			currentids: {
				emblemitem: { type: Number, default: 1 },
				shopitem: { type: Number, default: 1 }
			},
			vips: {
				dailymultiplier: { type: Number, default: 1 },
				xpmultiplier: { type: Number, default: 1 },
				roles: { type: Array },
				users: { type: Array }
			},
			fnshop: {
				enabled: { type: Boolean, default: false }
			},
			badwords: {
				enabled: { type: Boolean, default: false },
				whitelist: {
					strings: { type: Array },
					channels: { type: Array },
					users: { type: Array },
					roles: { type: Array }
				},
				blacklist: {
					strings: { type: Array },
					channels: { type: Array },
					users: { type: Array },
					roles: { type: Array }
				}
			},
			leveling: {
				enabled: { type: Boolean, default: false },
				xpammount: { type: Number, default: 3 },
				whitelist: {
					channels: { type: Array },
					roles: { type: Array }
				},
				blacklist: {
					channels: { type: Array },
					roles: { type: Array }
				}
			},
			economy: {
				enabled: { type: Boolean, default: false },
				bankmoney: { type: Number, default: 0 },
				itemshop: { type: Array },
				dailyrange: [{ type: Number, default: 100 }, { type: Number, default: 250 }],
				whitelist: {
					channels: { type: Array },
					roles: { type: Array }
				},
				blacklist: {
					channels: { type: Array },
					roles: { type: Array }
				}
			},
			interactions: {
				enabled: { type: Boolean, default: false },
				whitelist: {
					channels: { type: Array },
					roles: { type: Array }
				},
				blacklist: {
					channels: { type: Array },
					roles: { type: Array }
				}
			},
			misc: {
				dailyusers: { type: Array },
				karmausers: { type: Array }
			}
		}
		));
	exports.DBGuild = guilddata;
	console.log('[LOAD] "Guildata Schema" carregado com sucesso.')

	// Emblem Schema

	let emblemdata = new mongoose.model(
		"emblems", mongoose.Schema({
			guildid: { type: String },
			name: { type: String },
			rarity: { type: String },
			date: { type: String },
			desc: { type: String },
			id: { type: Number },
			members: { type: Number, default: 0 },
		}
		));
	exports.DBEmblemData = emblemdata;
	console.log('[LOAD] "Emblemdata Schema" carregado com sucesso.')

	// Shop Schema

	let shopdata = new mongoose.model(
		"shops", mongoose.Schema({
			guildid: { type: String },
			name: { type: String },
			price: { type: Number },
			currency: { type: String },
			desc: { type: String },
			itemid: { type: Number },
			id: { type: Number }
		}
		));
	exports.DBShopData = shopdata;
	console.log('[LOAD] "Shopdata Schema" carregado com sucesso.')

	// Fortnite Item Reminder Schema

	let fnreminderdata = new mongoose.model(
		"fnreminders", mongoose.Schema({
			userid: { type: String },
			name: { type: String },
			cid: { type: String },
			rarity: { type: String },
			desc: { type: String },
			date: { type: String }
		}
		));
	exports.DBFNReminderData = fnreminderdata;
	console.log('[LOAD] "FNReminderData Schema" carregado com sucesso.')

	// Codes Schema

	let codedata = new mongoose.model(
		"codes", mongoose.Schema({
			guildid: { type: String },
			code: { type: String },
			usedcount: { type: Number, default: 0 },
			maxuses: { type: String, default: 'infinite' },
			usespermember: { type: Number, default: 1 },
			allowedredeem: { type: String, default: 'onlyself' },
			createddate: { type: String },
			expiredate: { type: String, default: 'never' },
			type: { type: String },
			data: { type: Object },
			members: { type: Array },
		}
		));
	exports.DBCodeData = codedata;
	console.log('[LOAD] "Codedata Schema" carregado com sucesso.')
};
