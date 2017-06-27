'use strict';

module.exports = {
	assertPromiseInterpretEqual: assertPromiseInterpretEqual,
	assertPromiseExecutionEqual: assertPromiseExecutionEqual
};

function assertPromiseExecutionEqual(root, str, done, cb, errcb) {
	root.parse(str)
		.resolve()
		.then(req => {
			return req.execute().then(() => req);
		})
		.then(req => {
			if(typeof cb === 'function') {
				cb(req);
				done();
			} else {
				done(new Error('Did not throw expected error'));
			}
		})
		.catch(err => {
			if (typeof errcb === 'function') {
				errcb(err);
				done();
			} else {
				done(err);
			}
		});
}

function assertPromiseInterpretEqual(app, str, done, cb, errcb) {
	app.parse(str)
		.then(req => {
			if(typeof cb === 'function') {
				cb(req);
				done();
			} else {
				done(new Error('Did not throw expected error'));
			}
		})
		.catch(err => {
			if (typeof errcb === 'function') {
				errcb(err);
				done();
			} else {
				done(err);
			}
		});
}
