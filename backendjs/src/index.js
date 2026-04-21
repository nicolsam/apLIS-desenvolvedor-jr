const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  exposedHeaders: ['Accept-Language'],
}));
app.use(express.json());

const PacienteController = require('./Controller/PacienteController');

app.get('/api/v1/pacientes', (req, res) => PacienteController.index(req, res));
app.get('/api/v1/pacientes/:id', (req, res) => PacienteController.show(req, res));
app.post('/api/v1/pacientes', (req, res) => PacienteController.store(req, res));
app.put('/api/v1/pacientes/:id', (req, res) => PacienteController.update(req, res));
app.delete('/api/v1/pacientes/:id', (req, res) => PacienteController.destroy(req, res));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;