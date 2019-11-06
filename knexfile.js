require('dotenv').config();

module.exports = {
	development: {
		client: 'mysql',
		connection: {
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME
		},
		migrations: {
			tableName: 'migrations',
			directory: __dirname + '/db/migrations'
		},
		seeds: {
			directory: __dirname + '/db/seeds/development'
		}
	},
	staging: {
		client: 'mysql',
		connection: {
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME
		},
		pool: {
			min: 2,
			max: 10
		},
		migrations: {
			tableName: 'migrations',
			directory: __dirname + '/db/migrations'
		},
		seeds: {
			directory: __dirname + '/db/seeds/staging'
		}
	},
	production: {
		client: 'mysql',
		connection: {
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME
		},
		pool: {
			min: 2,
			max: 10
		},
		migrations: {
			tableName: 'migrations',
			directory: __dirname + '/db/migrations'
		},
		seeds: {
			directory: __dirname + '/db/seeds/production'
		}
	}
};
