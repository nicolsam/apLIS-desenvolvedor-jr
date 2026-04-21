import i18n from 'i18next';

const API_URL = 'http://localhost:9000/api/v1/medicos';

export async function getMedicos() {
  const response = await fetch(API_URL, {
    headers: {
      'Accept-Language': i18n.language,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch medicos');
  }
  return response.json();
}

export async function createMedico(data) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept-Language': i18n.language,
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  
  if (!response.ok) {
    throw new Error(JSON.stringify({ error: result.error || 'Erro ao criar médico' }));
  }
  return result;
}