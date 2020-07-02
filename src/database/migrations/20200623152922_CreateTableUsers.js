
exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
      table.uuid('id').primary()
      table.string('email').notNullable()
      table.string('password').notNullable()
      table.string('name').notNullable()
      table.string('type').notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users')
};
