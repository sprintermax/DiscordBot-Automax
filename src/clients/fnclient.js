'use strict';

import FNBR from 'fnbr';

import * as Delay from '../utils/delay.js';
import { FNClient as FNCfg } from '../config.js';

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
	FNClient.party.me.clearEmote();
	FNClient.party.me.setOutfit(FNCfg.DefaultCosmetics.Outfit);
	FNClient.party.me.setBackpack(FNCfg.DefaultCosmetics.Backpack);
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

export default {
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

FNClient.on('party:member:joined', async (JoinedMember) => {
	if (JoinedMember.displayName === FNClient.user.displayName) return;
	await FNClient.party.me.clearEmote();
	await Delay.WaitMilis(3000);
	await FNClient.party.me.setEmote("EID_Wave");
	await Delay.WaitMilis(3000);
});

FNClient.on('party:updated', async (JoinedMember) => {
	if (FNCfg.FunnyPartyEnabled && (Array.from(FNClient.party.members, ([, pm]) => (pm)).length > 3)) {
		FunnyParty.started = true;
		FunnyParty.run();
	} else if (FunnyParty.started) FunnyParty.started = false;
});

FNClient.on('friend:message', async (FriendMessage) => {
	console.log(`[FNCLIENT] Mensagem Recebida de ${FriendMessage.author.displayName} | Conteúdo da Mensagem: ${FriendMessage.content}`);
	if (FriendMessage.content.toLowerCase().startsWith('link')) {
		await FriendMessage.author.sendMessage('test link response');
	}
	const args = FriendMessage.content.toLowerCase().split(' ');
	if (args[0] == 'skin') {
		await FNClient.party.me.setOutfit(args[1]);
	}
	if (args[0] == 'emote') {
		await FNClient.party.me.setEmote(args[1]);
	}
	if (args[0] == 'switchhide') {
		await FNClient.party.hideMembers(args[1]);
	}
});

FNClient.on('party:invite', (invitation) => { invitation.decline(); });
