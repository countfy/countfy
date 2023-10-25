import React from 'react'
import ReactDOM from 'react-dom/client'

// ROUTER
import Router from './router.tsx'

// TAILWINDCSS
import './tailwind/index.css'

// I18NEXT TRANSLATION LIB
import i18n from './locales/index.ts'
import { I18nextProvider } from 'react-i18next'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <Router />
    </I18nextProvider>
  </React.StrictMode>,
)
