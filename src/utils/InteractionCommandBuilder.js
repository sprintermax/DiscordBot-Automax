'use strict';

const { ConvertComponentType } = require('./MessageComponentActions');

module.exports.Command = class Command {

	SetName(name) {
		this.name = name;
		return this;
	}

	SetType(type) {
		//if (isNaN(type)) type = ConvertComponentType("ApplicationCommand", type.toUpperCase());
		if (type) this.type = type; //parseInt(type);
		return this;
	}

	SetDesc(desc) {
		if (desc) this.description = desc;
		return this;
	}

	FalseDefaultPerm() {
		this.default_permission = false;
		return this;
	}

	AddOption(option) {
		if (option) {
			if (!this.options) this.options = [option];
			else this.options.push(option);
		}
		return this;
	}
}

module.exports.CommandOption = class CommandOption {

	SetName(name) {
		if (name) this.name = name;
		return this;
	}

	SetType(type) {
		//if (isNaN(type)) type = ConvertComponentType("ApplicationCommandOption", type.toUpperCase());
		if (type) this.type = type; //parseInt(type);
		return this;
	}

	SetDesc(desc) {
		if (desc) this.description = desc;
		return this;
	}

	SetAsRequired() {
		this.required = true;
		return this;
	}

	AddChoice(name, value) {
		if (name && value) {
			if (!this.choices) this.choices = [{ name, value }];
			else this.choices.push({ name, value });
		}
		return this;
	}

	AddOption(option) {
		if (option) {
			if (!this.options) this.options = [option];
			else this.options.push(option);
		}
		return this;
	}
}
