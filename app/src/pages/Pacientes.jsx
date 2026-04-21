import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PacienteList from '../components/PacienteList';
import AddPacienteModal from '../components/AddPacienteModal';

export default function Pacientes() {
  const [showModal, setShowModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const { t } = useTranslation();

  const handleSuccess = () => {
    setRefreshKey((k) => k + 1);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('pacientes.title')}</h1>
        <button
          onClick={() => setShowModal(true)}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {t('pacientes.add')}
        </button>
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