
exports.up = function(knex) {
  return knex.schema.createTable('sprints', table => {
      table.uuid('id').primary()
      table.string('name').notNullable()
      table.text('description').notNullable()
      table.date('start_date').notNullable()
      table.date('end_date').notNullable()
      table.string('status').nullable()

      table.uuid('id_step')
      .notNullable()
      .references('id')
      .inTable('steps')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
      .index();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('sprints')
};
