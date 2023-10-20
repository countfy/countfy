import { useTranslation } from 'react-i18next'

import { useState } from 'react'

export default function Home() {

  const { t } = useTranslation()

  const [user] = useState({
    name: 'John'
  })

  return (
    <div className="flex flex-col">
      <span className="text-2xl mx-auto text-brand-secondary">{t('home.hello', {name: user.name})}</span>
    </div>
  )
}
