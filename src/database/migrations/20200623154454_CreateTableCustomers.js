
exports.up = function(knex) {
    return knex.schema.createTable('customers', table => {
        table.uuid('id').primary()
        table.string('name').notNullable()
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('customers')
  };
  