const API_URL = 'http://localhost:3000/api/v1/pacientes';

export async function getPacientes() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch pacientes');
  }
  return response.json();
}

export async function createPaciente(data) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to create paciente');
  }
  return response.json();
}