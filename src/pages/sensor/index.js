import { Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import BasicTabs from '../../components/Tabs'

const tabsList = [
  {
    title: 'Chi tiet',
    url: 'detail',
  },
  {
    title: 'Cau hinh',
    url: 'config',
  }
]

const SensorPage = () => {

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if(location.pathname==='/sensor'){
      navigate(tabsList[0].url)
    }
  })

  return (
    <>
        {/* Title */}
        <Typography variant='h3'>Cảm biến</Typography>
        <BasicTabs tabsList={tabsList}/>
    </>
  )
}

export default SensorPage