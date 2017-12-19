const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const config = require('./config/environment');
const neo = require('./databases/neo');

const app = express();

mongoose.Promise = global.Promise;

neo.createConstraints();

app.use(bodyParser.json());

app.set('port', (process.env.PORT || config.environment.webPort));
app.set('env', (process.env.ENV || 'development'));

app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', process.env.ALLOW_ORIGIN || 'http://localhost:4200');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);

	if (req.method === 'OPTIONS') {
		return res.status(200).end();
	}

	return next();
});

routes(app);

app.use((err, req, res, next) => {
	res.status(422).send({error: err.message});
});

app.use('*', (req, res) => {
	res.status(400);
	res.json({
		'error': 'this URL does not exist'
	});
});

module.exports = app;
