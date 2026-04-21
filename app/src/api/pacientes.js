const API_URL = 'http://localhost:3000/api/v1/pacientes';

export async function getPacientes() {
  const response = await fetch(API_URL);
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
    },
    body: JSON.stringify(payload),
  });
  const result = await response.json();
  
  if (!response.ok) {
    throw new Error(JSON.stringify({ error: result.error || 'Erro ao criar paciente' }));
  }
  return result;
}