const { t, getLanguage, translations } = require('../src/Translator');

describe('Translator', () => {
  describe('getLanguage', () => {
    it('should return pt-BR for Portuguese header', () => {
      const req = { headers: { 'accept-language': 'pt-BR,pt;q=0.9' } };
      expect(getLanguage(req)).toBe('pt-BR');
    });

    it('should return en-EN for English header', () => {
      const req = { headers: { 'accept-language': 'en-EN,en;q=0.9' } };
      expect(getLanguage(req)).toBe('en-EN');
    });

    it('should return pt-BR for empty header', () => {
      const req = { headers: {} };
      expect(getLanguage(req)).toBe('pt-BR');
    });

    it('should return pt-BR for undefined req', () => {
      expect(getLanguage(undefined)).toBe('pt-BR');
    });
  });

  describe('t', () => {
    it('should return Portuguese translation for pt-BR req', () => {
      const req = { headers: { 'accept-language': 'pt-BR' } };
      expect(t('invalid_data', req)).toBe('Dados inválidos');
      expect(t('patient_created', req)).toBe('Paciente criado com sucesso');
    });

    it('should return English translation for en-EN req', () => {
      const req = { headers: { 'accept-language': 'en-EN' } };
      expect(t('invalid_data', req)).toBe('Invalid data');
      expect(t('patient_created', req)).toBe('Patient created successfully');
    });

    it('should return key for unknown translation', () => {
      const req = { headers: { 'accept-language': 'pt-BR' } };
      expect(t('unknown_key', req)).toBe('unknown_key');
    });

    it('should default to pt-BR when req is null', () => {
      expect(t('invalid_data')).toBe('Dados inválidos');
    });
  });

  describe('translations', () => {
    it('should have all required keys in pt-BR', () => {
      expect(translations['pt-BR']).toHaveProperty('invalid_data');
      expect(translations['pt-BR']).toHaveProperty('patient_created');
      expect(translations['pt-BR']).toHaveProperty('cpf_exists');
    });

    it('should have all required keys in en-EN', () => {
      expect(translations['en-EN']).toHaveProperty('invalid_data');
      expect(translations['en-EN']).toHaveProperty('patient_created');
      expect(translations['en-EN']).toHaveProperty('cpf_exists');
    });
  });
});