const request = require('supertest');
const app = require('../../src/index');
const server = app.listen();

afterAll(() => {
  server.close();
});

describe('Paciente Controller', () => {
  describe('GET /api/v1/pacientes', () => {
    it('should return 200 and an array', async () => {
      const res = await request(app).get('/api/v1/pacientes');
      
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('should return pacientes with expected keys', async () => {
      const res = await request(app).get('/api/v1/pacientes');
      
      if (res.body.length > 0) {
        expect(res.body[0]).toHaveProperty('id');
        expect(res.body[0]).toHaveProperty('nome');
        expect(res.body[0]).toHaveProperty('dataNascimento');
        expect(res.body[0]).toHaveProperty('carteirinha');
        expect(res.body[0]).toHaveProperty('cpf');
      }
    });
  });

  describe('POST /api/v1/pacientes', () => {
    it('should create a new paciente', async () => {
      const uniqueCpf = (Date.now() + 1).toString().slice(-11);
      const newPaciente = {
        nome: 'Test Controller',
        dataNascimento: '2026-04-01',
        carteirinha: '777666',
        cpf: uniqueCpf
      };

      const res = await request(app)
        .post('/api/v1/pacientes')
        .send(newPaciente)
        .set('Content-Type', 'application/json');

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Paciente criado com sucesso');
    });

    it('should return 400 for invalid data', async () => {
      const invalidData = { nome: 'Only Name' };

      const res = await request(app)
        .post('/api/v1/pacientes')
        .send(invalidData)
        .set('Content-Type', 'application/json');

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Dados inválidos');
    });

    it('should return 409 for duplicate CPF', async () => {
      const duplicateCpf = '99988877766';
      
      await request(app)
        .post('/api/v1/pacientes')
        .send({
          nome: 'First Patient',
          dataNascimento: '2026-01-01',
          carteirinha: '111222',
          cpf: duplicateCpf
        })
        .set('Content-Type', 'application/json');

      const res = await request(app)
        .post('/api/v1/pacientes')
        .send({
          nome: 'Second Patient',
          dataNascimento: '2026-01-01',
          carteirinha: '333444',
          cpf: duplicateCpf
        })
        .set('Content-Type', 'application/json');

      expect(res.status).toBe(409);
      expect(res.body.error).toBe('CPF já cadastrado no sistema');
    });

    it('should return English message when Accept-Language is en-EN', async () => {
      const uniqueCpf = (Date.now() + 2).toString().slice(-11);
      
      const res = await request(app)
        .post('/api/v1/pacientes')
        .send({ nome: 'Only Name' })
        .set('Content-Type', 'application/json')
        .set('Accept-Language', 'en-EN');

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Invalid data');
    });

    it('should return Portuguese message when Accept-Language is pt-BR', async () => {
      const res = await request(app)
        .post('/api/v1/pacientes')
        .send({ nome: 'Only Name' })
        .set('Content-Type', 'application/json')
        .set('Accept-Language', 'pt-BR');

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Dados inválidos');
    });
  });
});