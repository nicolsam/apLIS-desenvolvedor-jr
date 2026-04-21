import { useState, useEffect } from 'react';

const DEFAULT_SETTINGS = {
  language: 'pt-BR',
  dateFormat: 'DD/MM/YYYY',
};

export function useSettings() {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('aplis_settings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  useEffect(() => {
    localStorage.setItem('aplis_settings', JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (newSettings) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    if (settings.dateFormat === 'DD/MM/YYYY') {
      return `${day}/${month}/${year}`;
    }
    return `${month}/${day}/${year}`;
  };

  return { settings, updateSettings, formatDate };
}