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

  describe('GET /api/v1/pacientes/:id', () => {
    it('should return 404 for non-existent paciente', async () => {
      const res = await request(app).get('/api/v1/pacientes/999999');
      
      expect(res.status).toBe(404);
      expect(res.body.error).toBe('Registro não encontrado');
    });

    it('should return 404 for deleted paciente', async () => {
      const uniqueCpf = (Date.now() + 100).toString().slice(-11);
      
      await request(app)
        .post('/api/v1/pacientes')
        .send({
          nome: 'To Be Deleted',
          dataNascimento: '2026-01-01',
          carteirinha: '999999',
          cpf: uniqueCpf
        })
        .set('Content-Type', 'application/json');
      
      const createRes = await request(app)
        .get('/api/v1/pacientes')
        .set('Accept-Language', 'pt-BR');
      
      const pacienteId = createRes.body[createRes.body.length - 1]?.id;
      if (pacienteId) {
        await request(app)
          .delete(`/api/v1/pacientes/${pacienteId}`);
        
        const res = await request(app).get(`/api/v1/pacientes/${pacienteId}`);
        expect(res.status).toBe(404);
      }
    });

    it('should return English not_found message when Accept-Language is en-EN', async () => {
      const res = await request(app)
        .get('/api/v1/pacientes/999999')
        .set('Accept-Language', 'en-EN');
      
      expect(res.status).toBe(404);
      expect(res.body.error).toBe('Record not found');
    });
  });

  describe('PUT /api/v1/pacientes/:id', () => {
    it('should update a paciente', async () => {
      const uniqueCpf = (Date.now() + 200).toString().slice(-11);
      
      await request(app)
        .post('/api/v1/pacientes')
        .send({
          nome: 'Original Name',
          dataNascimento: '2026-01-01',
          carteirinha: '555555',
          cpf: uniqueCpf
        })
        .set('Content-Type', 'application/json');
      
      const listRes = await request(app).get('/api/v1/pacientes');
      const paciente = listRes.body.find(p => p.cpf === uniqueCpf);
      
      const res = await request(app)
        .put(`/api/v1/pacientes/${paciente.id}`)
        .send({
          nome: 'Updated Name',
          dataNascimento: '2026-01-01',
          carteirinha: '555555',
          cpf: uniqueCpf
        })
        .set('Content-Type', 'application/json');

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Paciente atualizado com sucesso');
    });

    it('should return 404 for updating non-existent paciente', async () => {
      const res = await request(app)
        .put('/api/v1/pacientes/999999')
        .send({
          nome: 'Test',
          dataNascimento: '2026-01-01',
          carteirinha: '123456',
          cpf: '11122233344'
        })
        .set('Content-Type', 'application/json');

      expect(res.status).toBe(404);
      expect(res.body.error).toBe('Registro não encontrado');
    });

    it('should return 400 for invalid data on update', async () => {
      const res = await request(app)
        .put('/api/v1/pacientes/1')
        .send({ nome: 'Only Name' })
        .set('Content-Type', 'application/json');

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Dados inválidos');
    });
  });

  describe('DELETE /api/v1/pacientes/:id', () => {
    it('should soft delete a paciente', async () => {
      const uniqueCpf = (Date.now() + 300).toString().slice(-11);
      
      await request(app)
        .post('/api/v1/pacientes')
        .send({
          nome: 'To Delete',
          dataNascimento: '2026-01-01',
          carteirinha: '777777',
          cpf: uniqueCpf
        })
        .set('Content-Type', 'application/json');
      
      const listRes = await request(app).get('/api/v1/pacientes');
      const paciente = listRes.body.find(p => p.cpf === uniqueCpf);
      
      const res = await request(app).delete(`/api/v1/pacientes/${paciente.id}`);

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Paciente removido com sucesso');
    });

    it('should return 404 for deleting non-existent paciente', async () => {
      const res = await request(app).delete('/api/v1/pacientes/999999');

      expect(res.status).toBe(404);
      expect(res.body.error).toBe('Registro não encontrado');
    });

    it('should return English message when Accept-Language is en-EN', async () => {
      const res = await request(app)
        .delete('/api/v1/pacientes/999999')
        .set('Accept-Language', 'en-EN');

      expect(res.status).toBe(404);
      expect(res.body.error).toBe('Record not found');
    });
  });
});