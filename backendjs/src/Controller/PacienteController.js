const Paciente = require('../Model/Paciente');

class PacienteController {
  async index(req, res) {
    try {
      const pacientes = await Paciente.all();
      res.json(pacientes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async store(req, res) {
    try {
      const { nome, dataNascimento, carteirinha, cpf } = req.body;

      if (!nome || !dataNascimento || !carteirinha || !cpf) {
        return res.status(400).json({ error: 'Dados inválidos' });
      }

      await Paciente.create(req.body);
      res.json({ message: 'Paciente criado com sucesso' });
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: 'CPF já cadastrado no sistema' });
      }
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new PacienteController();