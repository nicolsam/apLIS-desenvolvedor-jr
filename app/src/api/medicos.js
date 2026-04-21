const API_URL = 'http://localhost:9000/api/v1/medicos';

export async function getMedicos() {
  const response = await fetch(API_URL);
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
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  
  if (!response.ok) {
    throw new Error(JSON.stringify({ error: result.error || 'Erro ao criar médico' }));
  }
  return result;
}