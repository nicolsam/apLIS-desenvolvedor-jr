import { z } from 'zod';

const createMessageParser = (t) => (issue) => {
  const path = issue.path[0];
  const key = `${path}_${issue.code === 'too_small' ? 'required' : issue.code === 'invalid_string' ? 'format' : ''}`;
  return t(`validation.${key}`) || t('validation.required');
};

export const medicoSchema = (t) => z.object({
  nome: z.string().min(1),
  CRM: z.string().min(1),
  UFCRM: z.string().length(2),
}).refine(
  (data) => data.UFCRM.length === 2,
  { message: 'uf_length', path: ['UFCRM'] }
);

export const pacienteSchema = (t) => z.object({
  nome: z.string().min(1),
  dataNascimento: z.string().min(1),
  carteirinha: z.string().regex(/^\d+$/),
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/),
});

export const parseWithSchema = (schemaFn, t, data) => {
  const schema = schemaFn(t);
  const result = schema.safeParse(data);
  if (!result.success) {
    const fieldErrors = {};
    result.error.issues.forEach((issue) => {
      const field = issue.path[0];
      let key = 'required';
      
      if (issue.code === 'too_small') {
        const fieldMap = { dataNascimento: 'dataNascimento', UFCRM: 'uf' };
        key = `${fieldMap[field] || field.toLowerCase()}_required`;
      } else if (issue.code === 'invalid_string') {
        if (issue.validation === 'regex') {
          if (field === 'cpf') key = 'cpf_format';
          else if (field === 'carteirinha') key = 'carteirinha_numbers';
        }
      } else if (issue.message === 'uf_length') {
        key = 'uf_length';
      }
      
      fieldErrors[field] = t(`validation.${key}`) || t('validation.required');
    });
    return { success: false, errors: fieldErrors };
  }
  return { success: true, data: result.data };
};