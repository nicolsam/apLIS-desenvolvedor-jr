import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getPacientes } from '../api/pacientes';
import { useSettings } from '../hooks/useSettings';

export default function PacienteList() {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { formatDate } = useSettings();
  const { t } = useTranslation();

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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}