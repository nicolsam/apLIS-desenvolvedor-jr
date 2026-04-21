const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const PacienteController = require('./Controller/PacienteController');

app.get('/api/v1/pacientes', (req, res) => PacienteController.index(req, res));
app.post('/api/v1/pacientes', (req, res) => PacienteController.store(req, res));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;