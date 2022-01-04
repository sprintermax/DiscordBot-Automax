'use strict';

import Mongoose from 'mongoose';

console.log('[TASK] Importação dos modelos da database iniciada.');

export const GuildDB = Mongoose.model('Guilds', Mongoose.Schema({
	GuildID: { type: String, required: true },
	Modules: {
		Leveling: {
			Enabled: { type: Boolean, default: false },
			Experience: {
				Ammout: { type: Number, default: 3 },
				Timer: { type: Number, default: 3 }
			},
			RoleRewards: [
				new Mongoose.Schema({
					RewardId: { type: Number, required: true },
					Created: { type: Date, default: Date.now() },
					RoleId: { type: String, required: true },
					GiveMethod: { type: String, default: 'adictive' },
					GrantLevel: { type: Number, required: true },
					ReplaceRewardId: { type: Number, required: true }
				})
			],
			Notifications: {
				LevelUp: {
					FirstLevel: { type: Number, default: 1 },
					Factor: { type: Number, default: 1 },
					Message: { type: String }
				},
				RewardMessage: { type: String }
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
		Economy: {
			Enabled: { type: Boolean, default: false },
			BankMoney: { type: Number, default: 0 },
			//GuildShop: [GuildShopItem], // To-Do
			TradeFeePercent: { type: Number, default: 5 },
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
			Badwords: {
				Enabled: { type: Boolean, default: false },
				Advanced: { type: Boolean, default: false },
				WarnUser: { type: Boolean, default: true },
				WarnMessage: { type: String },
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
		Vips: {
			Roles: [{ type: String }],
			Channels: [{ type: String }],
			Users: [{ type: String }],
			Modifiers: {
				ExpMultiplier: { type: Number, default: 1 },
				Daily: {
					ExpMultiplier: { type: Number, default: 1 },
					CoinsMultiplier: { type: Number, default: 1 }
				},
				TradeFeePercent: { type: Number, default: 1 },
				Reputation: {
					GiveBonus: { type: Number, default: 1 },
					ReceiveBonus: { type: Number, default: 1 }
				}
			}
		},
		Fortnite: {
			ItemShop: {
				Enabled: { type: Boolean, default: false },
				Channel: { type: String },
				Language: { type: String, default: 'en' }
			}
		}
	},
	Configuration: {
		Logging: {
			Moderation: {
				OnBan: {
					Enabled: { type: Boolean, default: false },
					OnlyBot: { type: Boolean, default: true },
					Channel: { type: String }
				},
				OnKick: {
					Enabled: { type: Boolean, default: false },
					OnlyBot: { type: Boolean, default: true },
					Channel: { type: String }
				},
				OnMute: {
					Enabled: { type: Boolean, default: false },
					OnlyBot: { type: Boolean, default: true },
					Channel: { type: String }
				},
				OnWarn: {
					Enabled: { type: Boolean, default: false },
					Channel: { type: String }
				},
				BadWords: {
					Enabled: { type: Boolean, default: false },
					Channel: { type: String }
				},
				DeletedMessages: {
					Enabled: { type: Boolean, default: false },
					Channel: { type: String }
				},
				EditedMessages: {
					Enabled: { type: Boolean, default: false },
					Channel: { type: String }
				}
			},
			Economy: {
				ShopPurchases: {
					Enabled: { type: Boolean, default: false },
					Channel: { type: String }
				},
				TradesComplete: {
					Enabled: { type: Boolean, default: false },
					Channel: { type: String }
				}
			},
			Leveling: {
				LevelUp: {
					Enabled: { type: Boolean, default: false },
					Channel: { type: String }
				},
				Reward: {
					Enabled: { type: Boolean, default: true },
					Channel: { type: String }
				}
			},
			Suggestions: {
				Enabled: { type: Boolean, default: false },
				Channel: { type: String }
			}
		},
		LegacyCommands: {
			Enabled: { type: Boolean, default: false },
			Prefix: { type: String, default: 'a!' },
		},
		CommandPermissions: [
			new Mongoose.Schema({
				CommandName: { type: String, required: true },
				CommandType: { type: String, required: true },
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
			})
		]
	},
	Dailies: {
		ResetMode: { type: String, default: 'midnight_utc' }, // or 'permember_12h' or 'permember_24h'
		KarmaUsers: [{ type: String }],
		DailyUsers: [{ type: String }]
	},
	Members: [
		new Mongoose.Schema({
			UserId: { type: String, required: true },
			Profile: {
				Created: { type: Date, default: Date.now() },
				ViewCount: { type: Number, default: 0 },
				Reputation: { type: Number, default: 0 },
				Experience: { type: Number, default: 0 },
				Money: { type: Number, default: 0 },
				Customization: {
					UIColor: { type: String },
					TextColor: { type: String },
					Opacity: { type: String },
					BgImage: { type: String }
				},
				UserInfo: {
					description: { type: String },
					gender: { type: String }
				}
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
	Codes: [
		new Mongoose.Schema({
			Code: { type: String, required: true },
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

export const GlobalUserDB = Mongoose.model('GlobalUsers', new Mongoose.Schema({
	UserId: { type: String, required: true },
	GlobalProfile: {
		Created: { type: Date, default: Date.now() },
		Experience: { type: Number, default: 0 },
	},
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
