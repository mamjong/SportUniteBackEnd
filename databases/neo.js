const neo4j = require('neo4j-driver').v1;
const env = require('../config/environment');

const driver = neo4j.driver(env.dbConnectionUrl);

module.exports = driver;
