import { useState, useEffect } from 'react';
import { Table } from 'flowbite-react';
import { getPacientes } from '../api/pacientes';

export default function PacienteList() {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>ID</Table.HeadCell>
            <Table.HeadCell>Nome</Table.HeadCell>
            <Table.HeadCell>Data Nascimento</Table.HeadCell>
            <Table.HeadCell>Carteirinha</Table.HeadCell>
            <Table.HeadCell>CPF</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {pacientes.map((paciente) => (
              <Table.Row key={paciente.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>{paciente.id}</Table.Cell>
                <Table.Cell>{paciente.nome}</Table.Cell>
                <Table.Cell>{new Date(paciente.dataNascimento).toLocaleDateString()}</Table.Cell>
                <Table.Cell>{paciente.carteirinha}</Table.Cell>
                <Table.Cell>{paciente.cpf}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </div>
  );
}