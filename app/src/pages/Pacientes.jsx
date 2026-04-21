import { useState } from 'react';
import { Button } from 'flowbite-react';
import PacienteList from '../components/PacienteList';
import AddPacienteModal from '../components/AddPacienteModal';

export default function Pacientes() {
  const [showModal, setShowModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSuccess = () => {
    setRefreshKey((k) => k + 1);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Pacientes</h1>
        <Button onClick={() => setShowModal(true)}>Adicionar</Button>
      </div>
      <PacienteList key={refreshKey} />
      <AddPacienteModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={handleSuccess}
      />
    </div>
  );
}