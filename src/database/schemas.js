'use strict';

const Mongoose = require('mongoose');

console.log('[TASK] Importação dos modelos da database iniciada.');

const GuildDB = Mongoose.model('Guilds', Mongoose.Schema({
	GuildID: { type: String, required: true },
	Leveling: {
		Enabled: { type: Boolean, default: false },
		LogChannel: { type: String },
		ExpAmmount: { type: Number, default: 3 },
		Whitelist: {
			Channels: [{ type: String }],
			Users: [{ type: String }],
			Roles: [{ type: String }]
		},
		Blacklist: {
			Channels: [{ type: String }],
			Users: [{ type: String }],
			Roles: [{ type: String }]
		}
	},
	Economy: {
		Enabled: { type: Boolean, default: false },
		BankMoney: { type: Number, default: 0 },
		//GuildShop: [GuildShopItem], // To-Do
		TradeFeePercent: { type: Number, default: 5 },
		LogChannels: {
			ShopPurchases: { type: String },
			TradesComplete: { type: String }
		},
		DailyRange: {
			Min: { type: Number, default: 100 },
			Max: { type: Number, default: 250 }
		},
		Whitelist: {
			Channels: [{ type: String }],
			Users: [{ type: String }],
			Roles: [{ type: String }]
		},
		Blacklist: {
			Channels: [{ type: String }],
			Users: [{ type: String }],
			Roles: [{ type: String }]
		}
	},
	Moderation: {
		LogChannels: {
			ManualPunishments: { type: String },
			DeletedBadwords: { type: String },
		},
		Badwords: {
			Enabled: { type: Boolean, default: false },
			Whitelist: {
				Strings: [{ type: String }],
				Channels: [{ type: String }],
				Users: [{ type: String }],
				Roles: [{ type: String }]
			},
			Blacklist: {
				Strings: [{ type: String }],
				Channels: [{ type: String }],
				Users: [{ type: String }],
				Roles: [{ type: String }]
			}
		}
	},
	GuildVips: {
		Roles: [{ type: String }],
		Users: [{ type: String }],
		Chats: [{ type: String }],
		Modifiers: {
			ExpMultiplier: { type: Number, default: 1 },
			DailyMultiplier: { type: Number, default: 1 },
			TradeFeePercent: { type: Number, default: 1 },
			BonusRepReceive: { type: Number, default: 1 },
			BonusRepGive: { type: Number, default: 1 }
		}
	},
	Fortnite: {
		AutoShop: {
			Enabled: { type: Boolean, default: false },
			Channel: { type: String },
			Language: { type: String, default: 'en' }
		}
	},
	Dailies: {
		ResetMode: { type: String, default: 'midnight_utc' }, // or 'permember_12h' or 'permember_24h'
		KarmaUsers: [{ type: String }],
		DailyUsers: [{ type: String }]
	},
	GuildMembers: [
		new Mongoose.Schema({
			UserId: { type: String, required: true },
			Profile: {
				Created: { type: Date, default: Date.now() },
				ViewCount: { type: Number, default: 0 },
				Reputation: { type: Number, default: 0 },
				Experience: { type: Number, default: 0 },
				Money: { type: Number, default: 0 }
			},
			Inventory: [
				new Mongoose.Schema({
					ItemId: { type: Number, required: true },
					ItemType: { type: String, required: true },
					ItemCount: { type: Number, default: 0 },
					ItemData: { type: Object }
				})
			]
		})
	],
	GuildCodes: [
		new Mongoose.Schema({
			GuildCode: { type: String, required: true },
			Created: { type: String, default: Date.now() },
			RedeemedMembers: [{ type: String }],
			Grants: [{ type: Object, required: true }],
			Config: {
				MaxUses: { type: Number, default: -1 },
				Redeem: {
					Method: { type: String, default: 'everyone' }, // everyone | onlyvip | notvip
					Whitelist: {
						Channels: [{ type: String }],
						Users: [{ type: String }],
						Roles: [{ type: String }]
					},
					Blacklist: {
						Channels: [{ type: String }],
						Users: [{ type: String }],
						Roles: [{ type: String }]
					}
				},
				Expires: {
					AutoDelete: { type: Boolean, default: true },
					DeleteAfterMaxUses: { type: Boolean, default: true },
					DeleteAfterDate: { type: String, default: 'never' },
					DeleteAfterUses: { type: Number, default: -1 }
				}
			}
		})
	],
	Emblems: [
		new Mongoose.Schema({
			EmblemId: { type: Number, required: true },
			Name: { type: String, required: true },
			Desc: { type: String },
			Image: { type: String },
			Type: { type: String, required: true },
			Date: { type: String, default: Date.now() },
			Members: [{ type: String }]
		})
	]
}));

console.log('[LOAD] Modelo GuildDB carregado com sucesso.');

const GlobalUserDB = Mongoose.model('GlobalUsers', new Mongoose.Schema({
	UserId: { type: String, required: true },
	Fortnite: {
		AccountId: { type: String },
		LinkedDate: { type: Date },
		ItemReminders: [
			new Mongoose.Schema({
				ReminderId: { type: Number, required: true },
				FNItemId: { type: String, required: true },
				Persistent: { type: Boolean, default: false },
				DateAdded: { type: String, default: Date.now() }
			})
		]
	},
	Minecraft: {
		Username: { type: String },
		LinkedDate: { type: Date }
	},
	Xbox: {
		Username: { type: String },
		LinkedDate: { type: Date }
	},
	PlaysTation: {
		Username: { type: String },
		LinkedDate: { type: Date }
	}
}));

console.log('[LOAD] Modelo GlobalUserDB carregado com sucesso.');

console.log('[TASK] Importação dos modelos da database finalizada.\n');

module.exports = {
	GuildDB,
	GlobalUserDB
}
