const neo = require('../databases/neo.js').driver;

module.exports = {

	get(req, res, next) {
		const session = neo.session();

		session.run("MATCH (user:User) RETURN user")
			.then((result) => {
				session.close();
				res.status(200).json(result.records);
			})
			.catch((error) => {
				session.close();
				console.error(error);
				res.status(400).json(error);
			});
	},

	getOne(req, res, next) {
		const session = neo.session();

		session.run("MATCH (user:User {username: {username}}) RETURN user", {username: req.params.username})
			.then((result) => {
				session.close();
				if (result.records.length > 0) {
					res.status(200).json(result.records);
				} else {
					res.status(404).json(result.records);
				}
			})
			.catch((error) => {
				session.close();
				console.error(error);
				res.status(400).json(error);
			});
	},

	post(req, res, next) {
		const session = neo.session();

		session.run(
			"MERGE (user:User {username: {userUsername}, name: {userName}, age: {userAge}, email: {userEmail}, " +
			"timestamp: timestamp()}) " +
			"MERGE (city:City {name: {cityName}}) " +
			"MERGE (user)-[:LIVES_IN]->(city) " +
			"RETURN user, city",
			{
				userUsername: "H4RDC0DED",
				userName: "Hardcoded Harry",
				userAge: "26",
				userEmail: "email@email.com",
				cityName: "New York",
			})
			.then((result) => {
				session.close();
				res.status(201).json(result.records);
			})
			.catch((error) => {
				session.close();
				console.error(error);
				res.status(400).json(error);
			});
	},

	put(req, res, next) {
		const session = neo.session();

		session.run(
			"MATCH (user:User {username: {userUsername}})-[rel:LIVES_IN]->() " +
			"DELETE rel " +
			"SET user.username = {userUsername}, user.name = {userName}, user.age = {userAge}, user.email = {userEmail} " +
			"MERGE (user)-[:LIVES_IN]->(city:City {name: {cityName}}) " +
			"RETURN user, city",
			{
				userUsername: req.params.username,
				userName: "Hardcoded Harryyyyy",
				userAge: "27",
				userEmail: "new@new.com",
				cityName: "New Yorkkkk",
			})
			.then((result) => {
				session.close();
				if (result.records.length > 0) {
					res.status(200).json(result.records);
				} else {
					res.status(404).json(result.records);
				}
			})
			.catch((error) => {
				session.close();
				console.error(error);
				res.status(400).json(error);
			});
	},

	deleteOne(req, res, next) {
		const session = neo.session();

		session.run(
			"MATCH (user:User {username: {userUsername}}) " +
			"WITH user, user.username as username, user.name as name, user.age as age, user.email as email " +
			"DETACH DELETE user " +
			"RETURN username, name, age, email",
			{
				userUsername: req.params.username
			})
			.then((result) => {
				session.close();
				if (result.records.length > 0) {
					res.status(200).json(result.records);
				} else {
					res.status(404).json(result.records);
				}
			})
			.catch((error) => {
				session.close();
				console.error(error);
				res.status(400).json(error);
			});
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
				if (userDB.password === user.password) {
					res.status(200).json({authorized: true});
				} else {
					res.status(401).json({authorized: false});
				}
			})
	}
};
