require('dotenv').config();
const knex = require('knex');
const dbEnvironment = process.env.NODE_ENV || 'development';
const knexConfig = require('../knexfile')[dbEnvironment];
module.exports = knex(knexConfig);

// const knex = require('knex');
// const config = require('../knexfile');
// module.exports = knex(config['development']);
