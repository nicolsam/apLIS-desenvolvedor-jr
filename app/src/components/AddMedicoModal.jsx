import { useState } from 'react';
import { Modal, TextInput, Button } from 'flowbite-react';
import { createMedico } from '../api/medicos';

export default function AddMedicoModal({ show, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    nome: '',
    CRM: '',
    UFCRM: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      await createMedico(formData);
      setFormData({ nome: '', CRM: '', UFCRM: '' });
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onClose={onClose}>
      <Modal.Header>Adicionar Médico</Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="text-red-600">{error}</div>}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">Nome</label>
            <TextInput
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">CRM</label>
            <TextInput
              name="CRM"
              value={formData.CRM}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">UF</label>
            <TextInput
              name="UFCRM"
              value={formData.UFCRM}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button color="gray" onClick={onClose}>Cancelar</Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}