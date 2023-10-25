import { useTranslation } from 'react-i18next'

import { useState, useEffect } from 'react'

import { Select } from 'ui'

import { getUserProjects } from '../services/user-project/serviceUserProject.ts'

export default function Home() {

  const [userProjectsSelect, setUserProjectsSelect] = useState([])

  useEffect(() => {
    getUserProjects()
      .then(({data}) => {

        const dataFormat = data.map(i => ({value: i.id, name: i.project.name}))
        
        setUserProjectsSelect(dataFormat)
      })
  }, [])

  const { t } = useTranslation()

  const [user] = useState({
    name: 'John'
  })

  return (
    <div className="h-full flex flex-col">

      {/* SELECT PROJECT */}
      <Select options={userProjectsSelect} className="mx-auto mt-10" />

      <span className="text-2xl mx-auto text-brand-secondary font-medium mt-20">{t('home.hello', {name: user.name})}</span>
    </div>
  )
}
