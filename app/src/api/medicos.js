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

export async function getMedico(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    headers: {
      'Accept-Language': i18n.language,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch medico');
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

export async function updateMedico(id, data) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept-Language': i18n.language,
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  
  if (!response.ok) {
    throw new Error(JSON.stringify({ error: result.error || 'Erro ao atualizar médico' }));
  }
  return result;
}

export async function deleteMedico(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept-Language': i18n.language,
    },
  });
  const result = await response.json();
  
  if (!response.ok) {
    throw new Error(JSON.stringify({ error: result.error || 'Erro ao remover médico' }));
  }
  return result;
}

export async function restoreMedico(id) {
  const response = await fetch(`${API_URL}/${id}/restore`, {
    method: 'POST',
    headers: {
      'Accept-Language': i18n.language,
    },
  });
  const result = await response.json();
  
  if (!response.ok) {
    throw new Error(JSON.stringify({ error: result.error || 'Erro ao restaurar médico' }));
  }
  return result;
}