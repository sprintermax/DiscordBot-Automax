'use strict';

module.exports.ConvertComponentType = (type, value, method) => {
	const definitions = {
		ApplicationCommand: {
			CHAT_INPUT: 1,
			USER: 2,
			MESSAGE: 3
		},
		ApplicationCommandOption: {
			SUB_COMMAND: 1,
			SUB_COMMAND_GROUP: 2,
			STRING: 3,
			INTEGER: 4,
			BOOLEAN: 5,
			USER: 6,
			CHANNEL: 7,
			ROLE: 8,
			MENTIONABLE: 9,
			NUMBER: 10
		},
		ApplicationCommandPermission: {
			ROLE: 1,
			USER: 2
		},
		MessageComponent: {
			ACTION_ROW: 1,
			BUTTON: 2,
			SELECT_MENU: 3
		},
		InteractionRequest: {
			PING: 1,
			APPLICATION_COMMAND: 2,
			MESSAGE_COMPONENT: 3
		},
		InteractionResponse: {
			PONG: 1,
			CHANNEL_MESSAGE_WITH_SOURCE: 4,
			DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE: 5,
			DEFERRED_UPDATE_MESSAGE: 6,
			UPDATE_MESSAGE: 7
		}
	};
	if (method === 'TO_NUMBER') return definitions[type][value];
	if (method === 'TO_STRING') for (const item in definitions[type]) if (definitions[type][item] == value) return item;
}

module.exports.UpdateComponents = (components, method, i) => {
	for (const component0 of components) {
		if (component0.type === 'ACTION_ROW') for (const component1 of component0.components) EditComponent(component1);

		function EditComponent(component) {
			if (['LOAD_OPTIONS', 'MIXED'].includes(method)) {
				if (component.type === 'BUTTON' && i.componentType === 'BUTTON' && component0.components.findIndex(button => button.customId === i.customId) !== -1)
					component.customId === i.customId ? component.disabled = true : component.disabled = false;

				if (component.type === 'SELECT_MENU' && i.componentType === 'SELECT_MENU' && component0.components.findIndex(menu => menu.customId === i.customId) !== -1)
					for (const menuitem of component.options) i.values.includes(menuitem.value) ? menuitem.default = true : menuitem.default = false;
			}
			if (['DISABLE_ALL', 'MIXED'].includes(method)) component.disabled = true;
		}
	}
	return components;
}

module.exports.FindRowDisabledButton = (components, prefix) => {
	for (const component0 of components) {
		if (component0.type === 'ACTION_ROW') for (const component1 of component0.components) {
			if (component1.type !== 'BUTTON' || component1.customId.indexOf(prefix) !== 0 || !component1.disabled) continue;
			return component1.customId.substring(prefix.length);
		}
	}
}

module.exports.FindAllDefaultMenuOptions = (components, menuid) => {
	const DefaultOptions = [];
	for (const component0 of components) if (component0.type === 'ACTION_ROW') for (const component1 of component0.components)
		if (component1.type === 'SELECT_MENU' && component1.customId === menuid) for (const option of component1.options)
			if (option.default) DefaultOptions.concat(option.values)
	return DefaultOptions;
}

module.exports.FindDefaultMenuOption = (components, menuid) => {
	for (const component0 of components) if (component0.type === 'ACTION_ROW') for (const component1 of component0.components)
		if (component1.type === 'SELECT_MENU' && component1.customId === menuid) return component1.options.find(option => option.default).value
}
