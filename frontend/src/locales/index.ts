import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import EN from './en/translation.json'
import PTBR from './pt-BR/translation.json'

const resources = {
  // en: { translation: EN },
  'pt-BR': { translation: PTBR }
}

i18n
  .use(initReactI18next)
  // .use(LanguageDetector)
  .init({
    lng: 'pt-BR',
    debug: import.meta.env.MODE === 'development' || false,
    resources,
    returnObjects: true,
    interpolation: {
      escapeValue: false
    },
  })

export default i18n
