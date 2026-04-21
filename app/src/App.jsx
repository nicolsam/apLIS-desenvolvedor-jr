import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './i18n';
import Sidebar from './components/Sidebar';
import Medicos from './pages/Medicos';
import Pacientes from './pages/Pacientes';
import Settings from './pages/Settings';
import { ToastProvider } from './components/Toast';

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <div className="flex min-h-screen bg-gray-50">
          <Sidebar />
          <main className="flex-1 lg:ml-64">
            <Routes>
              <Route path="/" element={<Navigate to="/medicos" replace />} />
              <Route path="/medicos" element={<Medicos />} />
              <Route path="/pacientes" element={<Pacientes />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;