
exports.up = function (knex) {
    return knex.schema.createTable('projects', table => {
        table.uuid('id').primary()
        table.string('name').notNullable()
        table.text('description').notNullable()
        table.date('start_date').notNullable()
        table.date('end_date').notNullable()

        table.uuid('id_manager')
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
            .index();

        table.uuid('id_customer')
            .notNullable()
            .references('id')
            .inTable('customers')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
            .index();
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('projects')
};
