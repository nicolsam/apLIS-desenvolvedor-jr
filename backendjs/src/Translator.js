const translations = {
  'pt-BR': {
    invalid_data: 'Dados inválidos',
    patient_created: 'Paciente criado com sucesso',
    patient_updated: 'Paciente atualizado com sucesso',
    patient_deleted: 'Paciente removido com sucesso',
    cpf_exists: 'CPF já cadastrado no sistema',
    not_found: 'Registro não encontrado',
  },
  'en-EN': {
    invalid_data: 'Invalid data',
    patient_created: 'Patient created successfully',
    patient_updated: 'Patient updated successfully',
    patient_deleted: 'Patient removed successfully',
    cpf_exists: 'CPF already registered in the system',
    not_found: 'Record not found',
  },
};

function getLanguage(req) {
  const header = req?.headers?.['accept-language'] || 'pt-BR';
  if (header.startsWith('en')) return 'en-EN';
  return 'pt-BR';
}

function t(key, req = null) {
  const lang = req ? getLanguage(req) : 'pt-BR';
  return translations[lang]?.[key] || key;
}

module.exports = { t, getLanguage, translations };