const Paciente = require('../Model/Paciente');
const { t } = require('../Translator');

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
        return res.status(400).json({ error: t('invalid_data', req) });
      }

      await Paciente.create(req.body);
      res.json({ message: t('patient_created', req) });
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: t('cpf_exists', req) });
      }
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new PacienteController();