import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getPacientes, deletePaciente, restorePaciente } from '../api/pacientes';
import { useSettings } from '../hooks/useSettings';
import { useToast } from './Toast';

export default function PacienteList({ onEdit, onSuccess }) {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletedId, setDeletedId] = useState(null);
  const { formatDate } = useSettings();
  const { t } = useTranslation();
  const { addToast, removeToast } = useToast();

  const fetchPacientes = async () => {
    try {
      setLoading(true);
      const data = await getPacientes();
      setPacientes(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPacientes();
  }, []);

  const handleDelete = async (paciente) => {
    const toastId = Date.now();
    setDeletedId(paciente.id);
    
    addToast(
      t('delete.removed'),
      'success',
      5000,
      t('delete.undo'),
      async () => {
        try {
          await restorePaciente(paciente.id);
          addToast(t('delete.restored'), 'success');
          fetchPacientes();
          if (onSuccess) onSuccess();
        } catch (err) {
          let errorMessage = err.message;
          try {
            const parsed = JSON.parse(err.message);
            errorMessage = parsed.error || errorMessage;
          } catch {}
          addToast(errorMessage, 'error');
        }
        removeToast(toastId);
      },
      toastId
    );

    try {
      await deletePaciente(paciente.id);
      fetchPacientes();
      if (onSuccess) onSuccess();
    } catch (err) {
      let errorMessage = err.message;
      try {
        const parsed = JSON.parse(err.message);
        errorMessage = parsed.error || errorMessage;
      } catch {}
      addToast(errorMessage, 'error');
      setDeletedId(null);
    }
  };

  return (
    <div className="overflow-x-auto">
      {loading ? (
        <div className="text-center py-4">Loading...</div>
      ) : error ? (
        <div className="text-center py-4 text-red-600">Error: {error}</div>
      ) : pacientes.length === 0 ? (
        <div className="text-center py-4 text-gray-500">No pacientes found</div>
      ) : (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">{t('pacientes.id')}</th>
                <th scope="col" className="px-6 py-3">{t('pacientes.name')}</th>
                <th scope="col" className="px-6 py-3">{t('pacientes.birthDate')}</th>
                <th scope="col" className="px-6 py-3">{t('pacientes.card')}</th>
                <th scope="col" className="px-6 py-3">{t('pacientes.cpf')}</th>
                <th scope="col" className="px-6 py-3">{t('actions.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {pacientes.map((paciente) => (
                <tr key={paciente.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{paciente.id}</td>
                  <td className="px-6 py-4">{paciente.nome}</td>
                  <td className="px-6 py-4">{formatDate(paciente.dataNascimento)}</td>
                  <td className="px-6 py-4">{paciente.carteirinha}</td>
                  <td className="px-6 py-4">{paciente.cpf}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <button
                      onClick={() => onEdit(paciente)}
                      className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                      title={t('actions.edit')}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(paciente)}
                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                      title={t('actions.delete')}
                      disabled={deletedId === paciente.id}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}