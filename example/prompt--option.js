var Root = require('../Root'),
	root = new Root();

function optionTestCommand (request) {
	console.log(require('util').inspect(request.command.parameters, { depth: 2, colors: true}));
	console.log(require('util').inspect(request.parameters, { depth: 2, colors: true}));
}

root.addCommand('test', optionTestCommand)
	.addParameter(new root.RequestData('derp')
		.setDescription('Ja!')
		.addValidator(function (val) {
			if(val.indexOf('x') >= 0)
				throw new Error('derp parameter cannot contain x')
		}))
	.setDescription('Test command which only dumps OPTION information')
	.addOption('alpha')
		.setDescription('Regular option (like the old API one)')
		.isRequired(true)
		.setShort('a')
		.next()
	.addOption(new root.RequestData('beta')
		.setDescription('An option that must contain "x" and cannot contain "y"')
		.isRequired(function checkIfIsAwesome (value) {
			if (value.indexOf('x') === -1)
				throw new Error('Your option must contain the letter "x"')
		})
		.addValidator(function anotherRandomCheck (value) {
			if (value.indexOf('y') >= 0)
				throw new Error('Your option cannot contain a "y"');
		}))
	.addCommand('test2')
		.addParameter('harr', 'nerf', true);
	;

try {
	var res = root.interpret(
			process.argv.slice(2),
			{depth: 3, colors: true});
	if(res.error)
		throw res.error;
	console.log(require('util').inspect(res));

	res.validate();
} catch(e) {
	console.log(res);
	console.error(e.stack);
}