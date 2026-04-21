import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getMedicos, deleteMedico } from '../api/medicos';
import { useToast } from './Toast';

export default function MedicoList({ onEdit, onSuccess }) {
  const [medicos, setMedicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation();
  const { addToast } = useToast();

  const fetchMedicos = async () => {
    try {
      setLoading(true);
      const data = await getMedicos();
      setMedicos(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedicos();
  }, []);

  const handleDelete = async (medico) => {
    try {
      await deleteMedico(medico.id);
      addToast(t('delete.removed'), 'success');
      addToast(t('delete.undoComing'), 'info');
      fetchMedicos();
      if (onSuccess) onSuccess();
    } catch (err) {
      let errorMessage = err.message;
      try {
        const parsed = JSON.parse(err.message);
        errorMessage = parsed.error || errorMessage;
      } catch {}
      addToast(errorMessage, 'error');
    }
  };

  return (
    <div className="overflow-x-auto">
      {loading ? (
        <div className="text-center py-4">Loading...</div>
      ) : error ? (
        <div className="text-center py-4 text-red-600">Error: {error}</div>
      ) : medicos.length === 0 ? (
        <div className="text-center py-4 text-gray-500">No medicos found</div>
      ) : (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">{t('medicos.id')}</th>
                <th scope="col" className="px-6 py-3">{t('medicos.name')}</th>
                <th scope="col" className="px-6 py-3">{t('medicos.crm')}</th>
                <th scope="col" className="px-6 py-3">{t('medicos.uf')}</th>
                <th scope="col" className="px-6 py-3">{t('actions.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {medicos.map((medico) => (
                <tr key={medico.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{medico.id}</td>
                  <td className="px-6 py-4">{medico.nome}</td>
                  <td className="px-6 py-4">{medico.CRM}</td>
                  <td className="px-6 py-4">{medico.UFCRM}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <button
                      onClick={() => onEdit(medico)}
                      className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                      title={t('actions.edit')}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(medico)}
                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                      title={t('actions.delete')}
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