import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  const navItems = [
    { path: '/medicos', labelKey: 'app.medicos' },
    { path: '/pacientes', labelKey: 'app.pacientes' },
    { path: '/settings', labelKey: 'app.settings' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 text-gray-500 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 lg:hidden"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
      </button>

      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800">{t('app.title')}</h2>
        </div>

        <nav className="px-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="ml-3">{t(item.labelKey)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}