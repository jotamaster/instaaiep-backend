require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const routes = require('./routes/index');
const { Model } = require('objection');
const knexConfig = require('./knexfile');
const Knex = require('knex');

app.use('/api/static', express.static(__dirname + '/static'));

app.use(express.json());

const knex = Knex(knexConfig[process.env.NODE_ENV]);

Model.knex(knex);

routes(app);

// error 404
app.use((req, res) => {
	res.status(404).send({
		error: 'Not found',
		path: req.url
	});
});

app.listen(process.env.PORT, () => console.log(`API listening on port ${process.env.PORT}`));
