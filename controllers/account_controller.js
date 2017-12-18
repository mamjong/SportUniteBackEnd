const neo = require('./databases/neo.js');

module.exports = {

	get(req, res, next) {
		res.send('Endpoint works');
	},

	post(req, res, next) {

	},

	put(req, res, next) {

	},

	delete(req, res, next) {

	},

	login(req, res, next) {

		user = req.body;
		let query = neo.run(
			'match (n:User{username: $username})' +
			'return n',
			{username: user.username}
		);

		query
			.then((userDB) => {
				if(userDB.password === user.password){
					res.status(200).json({authorized: true});
				}else{
                    res.status(401).json({authorized: false});
				}
			})
	}
};
