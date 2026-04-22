const knex = require('knex')(require('../../knexfile')[process.env.NODE_ENV || 'development']);

class Paciente {
  async all() {
    return knex('pacientes').select('id', 'nome', 'dataNascimento', 'carteirinha', 'cpf').whereNull('deleted_at');
  }

  async find(id) {
    const result = await knex('pacientes').select('id', 'nome', 'dataNascimento', 'carteirinha', 'cpf').where('id', id).whereNull('deleted_at').first();
    return result || null;
  }

  async create(data) {
    const [id] = await knex('pacientes').insert({
      nome: data.nome,
      dataNascimento: data.dataNascimento,
      carteirinha: data.carteirinha,
      cpf: data.cpf
    });
    return id;
  }

  async update(id, data) {
    return knex('pacientes').where('id', id).whereNull('deleted_at').update({
      nome: data.nome,
      dataNascimento: data.dataNascimento,
      carteirinha: data.carteirinha,
      cpf: data.cpf
    });
  }

  async delete(id) {
    return knex('pacientes').where('id', id).whereNull('deleted_at').update({
      deleted_at: knex.fn.now()
    });
  }

  async findDeleted(id) {
    const result = await knex('pacientes').select('id', 'nome', 'dataNascimento', 'carteirinha', 'cpf').where('id', id).whereNotNull('deleted_at').first();
    return result || null;
  }

  async restore(id) {
    return knex('pacientes').where('id', id).whereNotNull('deleted_at').update({
      deleted_at: null
    });
  }
}

module.exports = new Paciente();