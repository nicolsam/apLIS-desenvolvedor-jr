const knex = require('knex')(require('../../knexfile')[process.env.NODE_ENV || 'development']);

class Paciente {
  async all() {
    return knex('pacientes').select('id', 'nome', 'dataNascimento', 'carteirinha', 'cpf');
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
}

module.exports = new Paciente();