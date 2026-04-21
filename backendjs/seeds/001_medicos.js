exports.seed = function(knex) {
  return knex('medicos').del()
    .then(function() {
      return knex('medicos').insert([
        {
          nome: 'Dr. João da Silva',
          CRM: '123456',
          UFCRM: 'CE'
        }
      ]);
    });
};