const { uuid } = require('uuidv4')

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { id: uuid(), name: 'Raphael Rodrigues', type: 'admin', email: "raphael@email.com", password: "123456" },
        { id: uuid(), name: 'Nahan Rezende', type: 'user', email: "nahan@email.com", password: "123456" },
      ]);
    });
};
