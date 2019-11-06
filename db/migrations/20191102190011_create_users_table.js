const tabaleName = 'users';

exports.up = (knex) => {
	return knex.schema.createTable(tabaleName, (table) => {
		table.increments('id');
		table.string('username');
		table.string('password');
		table.string('email');

		table.unique('username');
		table.unique('email');
	});
};

exports.down = (knex) => {
	return knex.schema.dropTable(tabaleName);
};
