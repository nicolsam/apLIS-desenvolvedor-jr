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

  async show(req, res) {
    try {
      const { id } = req.params;
      const paciente = await Paciente.find(id);
      
      if (!paciente) {
        return res.status(404).json({ error: t('not_found', req) });
      }
      
      res.json(paciente);
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

  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome, dataNascimento, carteirinha, cpf } = req.body;

      if (!nome || !dataNascimento || !carteirinha || !cpf) {
        return res.status(400).json({ error: t('invalid_data', req) });
      }

      const exists = await Paciente.find(id);
      if (!exists) {
        return res.status(404).json({ error: t('not_found', req) });
      }

      await Paciente.update(id, req.body);
      res.json({ message: t('patient_updated', req) });
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: t('cpf_exists', req) });
      }
      res.status(500).json({ error: error.message });
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;
      
      const exists = await Paciente.find(id);
      if (!exists) {
        return res.status(404).json({ error: t('not_found', req) });
      }

      await Paciente.delete(id);
      res.json({ message: t('patient_deleted', req) });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new PacienteController();