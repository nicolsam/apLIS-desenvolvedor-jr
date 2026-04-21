import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSettings } from '../hooks/useSettings';

export default function Settings() {
  const { t, i18n } = useTranslation();
  const { settings, updateSettings } = useSettings();
  const [saved, setSaved] = useState(false);

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    updateSettings({ language: newLang });
    i18n.changeLanguage(newLang);
  };

  const handleDateFormatChange = (e) => {
    updateSettings({ dateFormat: e.target.value });
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">{t('settings.title')}</h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            {t('settings.language')}
          </label>
          <select
            value={settings.language}
            onChange={handleLanguageChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="pt-BR">Português (Brasil)</option>
            <option value="en-EN">English (US)</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            {t('settings.dateFormat')}
          </label>
          <select
            value={settings.dateFormat}
            onChange={handleDateFormatChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
          </select>
        </div>

        <button
          onClick={handleSave}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {t('settings.save')}
        </button>

        {saved && (
          <p className="text-green-600 text-sm mt-2">{t('settings.saved')}</p>
        )}
      </div>
    </div>
  );
}