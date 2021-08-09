'use strict';

module.exports.ConvertComponentType = (type, method) => {
	const definitions = {
		ACTION_ROW: 1,
		BUTTON: 2,
		SELECT_MENU: 3
	};
	if (method === 'TO_NUMBER') return definitions[type];
	if (method === 'TO_STRING') for (const item in definitions) if (definitions[item] == type) return item;
}

module.exports.UpdateComponents = (components, method, i) => {
	for (const index0 in components) {
		if (components[index0].type === 'ACTION_ROW') for (const index1 in components[index0].components) EditComponent(components[index0].components[index1]);

		function EditComponent(component) {
			if (['LOAD_OPTIONS', 'MIXED'].includes(method)) {
				if (component.type === 'BUTTON' && i.componentType === 'BUTTON') {
					const buttonindex = components[index0].components.findIndex(button => button.customId === i.customId);
					if (buttonindex !== -1)
						if (i.customId === component.customId) component.disabled = true
						else component.disabled = false;
				}
				if (component.type === 'SELECT_MENU' && i.componentType === 'SELECT_MENU') for (const index in component.options) {
					const menuindex = components[index0].components.findIndex(menu => menu.customId === i.customId);
					if (i.values.includes(component.options[index].value)) {
						if (menuindex !== -1) component.options[index].default = true
					} else if (menuindex !== -1) component.options[index].default = false
				}
			}
			if (['DISABLE_ALL', 'MIXED'].includes(method)) component.disabled = true;
		}
	}
	return components;
}

module.exports.FindDisabledButton = (components, prefix) => {
	for (const index0 in components) {
		if (components[index0].type === 'ACTION_ROW') for (const index1 in components[index0].components) {
			const component = components[index0].components[index1];
			if (component.type === 'BUTTON' && component.customId.indexOf(prefix) === 0 && component.disabled === true) {
				return component.customId.substring(prefix.length);
			};
		}
	}
}
