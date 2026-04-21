import { useState, useEffect } from 'react';
import { Table } from 'flowbite-react';
import { getMedicos } from '../api/medicos';

export default function MedicoList() {
  const [medicos, setMedicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <div className="overflow-x-auto">
      {loading ? (
        <div className="text-center py-4">Loading...</div>
      ) : error ? (
        <div className="text-center py-4 text-red-600">Error: {error}</div>
      ) : medicos.length === 0 ? (
        <div className="text-center py-4 text-gray-500">No medicos found</div>
      ) : (
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>ID</Table.HeadCell>
            <Table.HeadCell>Nome</Table.HeadCell>
            <Table.HeadCell>CRM</Table.HeadCell>
            <Table.HeadCell>UF</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {medicos.map((medico) => (
              <Table.Row key={medico.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>{medico.id}</Table.Cell>
                <Table.Cell>{medico.nome}</Table.Cell>
                <Table.Cell>{medico.CRM}</Table.Cell>
                <Table.Cell>{medico.UFCRM}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </div>
  );
}