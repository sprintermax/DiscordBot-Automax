'use strict';

const FNBR = require('fnbr');

const Delay = require('../utils/delay.js');
const FNCfg = require('../config.js').FNClient;

const FNClient = new FNBR.Client({
	status: 'Use Code "Sprintermax"',
	auth: {
		deviceAuth: {
			accountId: process.env.FNACCID,
			deviceId: process.env.FNDVID,
			secret: process.env.FNSCRT
		}
	}
});

function LoadDefaultCosmetics() {
	FNClient.party.me.setOutfit('CID_069_Athena_Commando_F_PinkBear');
	FNClient.party.me.setBackpack('BID_557_SharkSuitFemale');
	FNClient.party.me.clearEmote();
}

async function FriendsCheckup() {
	const CurrentFriends = Array.from(FNClient.friends, ([, frienddata]) => (frienddata));
	if (CurrentFriends.length < FNCfg.MaxFriends) return;
	CurrentFriends.sort(function (a, b) {
		return new Date(b.createdAt) - new Date(a.createdAt);
	});
	for (let i = CurrentFriends.length; i > FNCfg.MaxFriends; i--) {
		if (CurrentFriends[i - 1].id !== FNCfg.OwnerID) {
			await FNClient.removeFriend(CurrentFriends[i - 1].id);
		} else i++;
	}
}

module.exports = {
	FNClient,
	async init() {
		console.log('[CONNECTION] Iniciando conexão com os serviços do Fortnite.');
		await FNClient.login();
		LoadDefaultCosmetics();
		FriendsCheckup();
		console.log(`[CONNECTION] Conectado aos serviços do Fortnite no usuário "${FNClient.user.displayName}".\n`);
	}
}

FNClient.on('friend:added', (AddedFriend) => {
	FriendsCheckup();
});

const FunnyParty = {
	started: false,
	run() {
		if (!this.started) return LoadDefaultCosmetics();
	}
}

FNClient.on('party:updated', async (JoinedMember) => {
	if (JoinedMember.displayName === FNClient.user.displayName) return;
	if (Array.from(FNClient.party.members, ([, pm]) => (pm)).length > 1) {
		await FNClient.party.me.clearEmote();
		await Delay.WaitMilis(3000);
		await FNClient.party.me.setEmote("EID_Wave");
		await Delay.WaitMilis(3000);
		if (FNCfg.FunnyParty) {
			FunnyParty.started = true;
			FunnyParty.run();
		}
	} FunnyParty.started = false;
});

FNClient.on('friend:message', (FriendMessage) => {
	console.log(`Mensagem Recebida de ${FriendMessage.author.displayName}\nConteúdo da Mensagem: ${FriendMessage.content}`);
	if (FriendMessage.content.startsWith('!Ping')) {
		FriendMessage.author.sendMessage('Pong! :D');
	}
});
