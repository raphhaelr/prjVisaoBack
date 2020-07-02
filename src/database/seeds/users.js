
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {name: 'Raphael Rodrigues', type: 'admin', email: "raphael@email.com", password: "123456"},
        {name: 'Nahan Rezende', type: 'user', email: "nahan@email.com", password: "123456"},

      ]);
    });
};
