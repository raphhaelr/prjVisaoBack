
exports.up = function (knex) {
  return knex.schema.createTable('steps', table => {
    table.uuid('id').primary()
    table.string('name')
    table.string('status').nullable()

      table.uuid('id_project')
            .notNullable()
            .references('id')
            .inTable('projects')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
            .index();
  })
};

exports.down = function (knex) {
  return knex.schema.dropTable('steps')
};
