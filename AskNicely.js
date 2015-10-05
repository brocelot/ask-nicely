'use strict';

var Request = require('./src/Request'),
	Option = require('./src/Option'),
	DeepOption = require('./src/DeepOption'),
	IsolatedOption = require('./src/IsolatedOption'),
	Parameter = require('./src/Parameter'),
	Command = require('./src/Command');


class AskNicely extends Command {
	/**
	 * @param {String} [name]
	 * @param {Function} [controller]
	 * @constructor
	 */
	constructor (name, controller) {
		super(name, controller);

		this.Command = Command;
		this.Option = Option;
		this.DeepOption = DeepOption;
		this.IsolatedOption = IsolatedOption;
		this.Parameter = Parameter;
	}

	/**
	 * @param {String|Array<String>} [pieces]
	 * @returns {Promise}
	 */
	interpret (pieces) {
		return Request.resolve(this, pieces || []);
	}
}

module.exports = AskNicely;
module.exports.Command = Command;
module.exports.Option = Option;
module.exports.DeepOption = DeepOption;
module.exports.IsolatedOption = IsolatedOption;
module.exports.Parameter = Parameter;