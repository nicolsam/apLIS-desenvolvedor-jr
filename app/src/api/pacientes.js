import i18n from 'i18next';

const API_URL = 'http://localhost:3000/api/v1/pacientes';

export async function getPacientes() {
  const response = await fetch(API_URL, {
    headers: {
      'Accept-Language': i18n.language,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch pacientes');
  }
  return response.json();
}

export async function createPaciente(data) {
  const payload = {
    ...data,
    cpf: data.cpf.replace(/\D/g, ''),
  };
  
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept-Language': i18n.language,
    },
    body: JSON.stringify(payload),
  });
  const result = await response.json();
  
  if (!response.ok) {
    throw new Error(JSON.stringify({ error: result.error || 'Erro ao criar paciente' }));
  }
  return result;
}