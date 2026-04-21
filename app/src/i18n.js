import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ptBR from './locales/pt-BR.json';
import enEN from './locales/en-EN.json';

const savedSettings = localStorage.getItem('aplis_settings');
const savedLanguage = savedSettings ? JSON.parse(savedSettings).language : 'pt-BR';

i18n.use(initReactI18next).init({
  resources: {
    'pt-BR': { translation: ptBR },
    'en-EN': { translation: enEN },
  },
  lng: savedLanguage,
  fallbackLng: 'pt-BR',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;