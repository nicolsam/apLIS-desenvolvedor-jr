exports.up = function(knex) {
  return knex.schema.alterTable('medicos', (table) => {
    table.timestamp('deleted_at').nullable();
  })
  .alterTable('pacientes', (table) => {
    table.timestamp('deleted_at').nullable();
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable('medicos', (table) => {
    table.dropColumn('deleted_at');
  })
  .alterTable('pacientes', (table) => {
    table.dropColumn('deleted_at');
  });
};