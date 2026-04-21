exports.up = function(knex) {
  return knex.schema.createTable('medicos', (table) => {
    table.increments('id').primary();
    table.string('nome', 255).notNullable();
    table.string('CRM', 20).notNullable();
    table.string('UFCRM', 2).notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  })
  .createTable('pacientes', (table) => {
    table.increments('id').primary();
    table.string('nome', 255).notNullable();
    table.date('dataNascimento').notNullable();
    table.string('carteirinha', 50).notNullable();
    table.string('cpf', 11).notNullable().unique();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('pacientes')
    .dropTableIfExists('medicos');
};