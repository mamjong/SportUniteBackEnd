const environment = {
	webPort: process.env.PORT || 3000,
	dbHost: process.env.DB_HOST || 'localhost',
	dbPort: process.env.DB_PORT || '7687',
	dbUser: process.env.DB_USER || 'Admin',
	dbPassword: process.env.DB_PASSWORD || 'Admin123',
	dbDatabase: process.env.DB_DATABASE || ''
};

const DbConnectionUrl = process.env.NODE_ENV === 'production' ?
	'bolt://' + environment.dbHost + ':' + environment.dbPort :
	'bolt://' + environment.dbHost + ':' + environment.dbPort;

module.exports = {
	environment: environment,
	dbConnectionUrl: DbConnectionUrl
};
