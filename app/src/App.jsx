import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Medicos from './pages/Medicos';
import Pacientes from './pages/Pacientes';

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 lg:ml-64">
          <Routes>
            <Route path="/" element={<Navigate to="/medicos" replace />} />
            <Route path="/medicos" element={<Medicos />} />
            <Route path="/pacientes" element={<Pacientes />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;