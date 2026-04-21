import { z } from 'zod';

export const medicoSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  CRM: z.string().min(1, 'CRM é obrigatório'),
  UFCRM: z.string().length(2, 'UF deve ter 2 caracteres'),
});

export const pacienteSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  dataNascimento: z.string().min(1, 'Data de nascimento é obrigatória'),
  carteirinha: z.string().regex(/^\d+$/, 'Carteirinha deve conter apenas números'),
  cpf: z.string().regex(/^\d{11}$/, 'CPF deve ter 11 dígitos numéricos (XXX.XXX.XXX-XX)'),
});