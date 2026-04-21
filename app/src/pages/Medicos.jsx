import { useState } from 'react';
import { Button } from 'flowbite-react';
import MedicoList from '../components/MedicoList';
import AddMedicoModal from '../components/AddMedicoModal';

export default function Medicos() {
  const [showModal, setShowModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSuccess = () => {
    setRefreshKey((k) => k + 1);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Médicos</h1>
        <Button onClick={() => setShowModal(true)}>Adicionar</Button>
      </div>
      <MedicoList key={refreshKey} />
      <AddMedicoModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={handleSuccess}
      />
    </div>
  );
}