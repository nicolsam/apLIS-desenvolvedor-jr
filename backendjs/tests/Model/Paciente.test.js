const Paciente = require('../../src/Model/Paciente');

describe('Paciente Model', () => {
  describe('all', () => {
    it('should return an array', async () => {
      const result = await Paciente.all();
      expect(Array.isArray(result)).toBe(true);
    });

    it('should contain paciente objects with expected keys', async () => {
      const result = await Paciente.all();
      if (result.length > 0) {
        expect(result[0]).toHaveProperty('id');
        expect(result[0]).toHaveProperty('nome');
        expect(result[0]).toHaveProperty('dataNascimento');
        expect(result[0]).toHaveProperty('carteirinha');
        expect(result[0]).toHaveProperty('cpf');
      }
    });
  });

  describe('create', () => {
    it('should insert a new paciente', async () => {
      const uniqueCpf = Date.now().toString().slice(-11);
      const testData = {
        nome: 'Dr. Test Jest',
        dataNascimento: '2026-03-01',
        carteirinha: '999888',
        cpf: uniqueCpf
      };

      const id = await Paciente.create(testData);
      expect(id).toBeDefined();
      expect(typeof id).toBe('number');
    });
  });
});