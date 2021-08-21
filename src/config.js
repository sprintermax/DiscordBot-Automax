'use strict';

const { Intents, Permissions } = require('discord.js');

module.exports.Discord = {
	ClientIntents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
		Intents.FLAGS.DIRECT_MESSAGES,
		Intents.FLAGS.DIRECT_MESSAGE_REACTIONS
	],
	InvitePerms: [
		Permissions.FLAGS.SEND_MESSAGES,
		Permissions.FLAGS.VIEW_CHANNEL,
		Permissions.FLAGS.ADMINISTRATOR // Temp just for easy tests
	]
}

module.exports.MongoDB = {
	ConnectionOptions: {
		useNewUrlParser: true,
		useUnifiedTopology: true
	}
}

module.exports.FNClient = {
	OwnerID: process.env.FNOWNR,
	FunnyPartyEnabled: true,
	FunnyPartyCosmetics: {
		Backblings: [],
		Outfits: [
			'CID_140_Athena_Commando_M_Visitor',
			'CID_540_Athena_Commando_M_MeteorManRemix',
			'CID_547_Athena_Commando_F_Meteorwoman',
			'CID_TBD_Athena_Commando_M_Turtleneck', // TEMP ID
			'CID_746_Athena_Commando_F_FuzzyBear',
			'CID_827_Athena_Commando_M_MultibotStealth',
			'CID_069_Athena_Commando_F_PinkBear',
			'CID_308_Athena_Commando_F_FortniteDJ',
			'CID_187_Athena_Commando_F_FuzzyBearPanda',
			'CID_156_Athena_Commando_F_FuzzyBearInd',
			'CID_640_Athena_Commando_M_TacticalBear',
			'CID_475_Athena_Commando_M_Multibot',
			'CID_554_Athena_Commando_F_MilitiaMascotCuddle',
			'CID_916_Athena_Commando_F_FuzzyBearSkull',
			'CID_258_Athena_Commando_F_FuzzyBearHalloween',
			'CID_627_Athena_Commando_F_SnufflesLeader',
			'CID_781_Athena_Commando_F_FuzzyBearTEDDY',
			'CID_580_Athena_Commando_M_CuddleTeamDark',
			'CID_153_Athena_Commando_F_CarbideBlack',
			'CID_A_009_Athena_Commando_F_FoxWarrior_21B9R',
			'CID_A_150_Athena_Commando_F_Pliant_D',
			'CID_A_105_Athena_Commando_F_SpaceCuddles_5TEVA',
			'CID_A_068_Athena_Commando_M_TerrainMan',
			'CID_265_Athena_Commando_F_AnimalJackets',
			'CID_244_Athena_Commando_M_PumpkinSuit',
			'CID_245_Athena_Commando_F_DurrburgerPjs',
			'CID_A_153_Athena_Commando_F_BuffCatFan_TS2DR',
			'CID_783_Athena_Commando_M_AquaJacket',
			'CID_691_Athena_Commando_F_TNTina',
			'CID_834_Athena_Commando_M_Axl',
			'CID_835_Athena_Commando_F_LadyAtlantis',
			'CID_803_Athena_Commando_F_SharkSuit',
			'CID_654_Athena_Commando_F_GiftWrap',
			'CID_832_Athena_Commando_F_AntiLlama',
			'CID_539_Athena_Commando_F_StreetGothCandy',
			'CID_883_Athena_Commando_M_ChOneJonesy',
			'CID_611_Athena_Commando_M_WeepingWoods',
			'CID_315_Athena_Commando_M_TeriyakiFish',
			'CID_313_Athena_Commando_M_KpopFashion',
			'CID_369_Athena_Commando_F_DevilRock',
			'CID_472_Athena_Commando_F_CyberKarate',
			'CID_499_Athena_Commando_F_AstronautEvil',
			'CID_604_Athena_Commando_F_Razor',
			'CID_617_Athena_Commando_F_ForestQueen',
			'CID_690_Athena_Commando_F_Photographer',
			'CID_706_Athena_Commando_M_HenchmanBad_34LVU',
			'CID_707_Athena_Commando_M_HenchmanGood_9OBH6',
			'CID_727_Athena_Commando_M_Tailor',
			'CID_741_Athena_Commando_F_HalloweenBunnySpring',
			'CID_752_Athena_Commando_M_Comet',
			'CID_753_Athena_Commando_F_Hostile',
			'CID_807_Athena_Commando_M_CandyApple_B1U7X',
			'CID_890_Athena_Commando_F_ChOneHeadhunter',
			'CID_959_Athena_Commando_M_Corny',
			'CID_964_Athena_Commando_M_Historian_869BC',
			'CID_989_Athena_Commando_M_ProgressiveJonesy',
			'CID_A_011_Athena_Commando_M_StreetCuddles',
			'CID_A_042_Athena_Commando_F_Scholar',
			'CID_A_060_Athena_Commando_M_Daytrader_8MRO2',
			'CID_A_062_Athena_Commando_F_Alchemy_XD6GP',
			'CID_A_175_Athena_Commando_M_AlienSummer'
		],
		Emotes: []
	},
	DefaultCosmetics: {
		Outfit: 'CID_069_Athena_Commando_F_PinkBear',
		Backpack: 'BID_557_SharkSuitFemale'
	},
	MaxFriends: 500
}
