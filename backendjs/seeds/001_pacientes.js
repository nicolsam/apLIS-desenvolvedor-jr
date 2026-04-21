exports.seed = function(knex) {
  return knex('pacientes').del()
    .then(function() {
      return knex('pacientes').insert([
        {
          nome: 'João da Silva',
          dataNascimento: '2026-01-01',
          carteirinha: '123456',
          cpf: '12345678909'
        }
      ]);
    });
};