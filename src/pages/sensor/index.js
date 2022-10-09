import { Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import BasicTabs from '../../components/Tabs'
import { setCurrentTab } from '../../redux/tabs'

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
  const distpatch = useDispatch()

  useEffect(() => {
    if(location.pathname==='/sensor'){
      navigate(tabsList[0].url)
    }
  })
  
  useEffect(() => {
    distpatch(setCurrentTab("sensor"));
  }, [])

  return (
    <>
        {/* Title */}
        <Typography variant='h3'>Cảm biến</Typography>
        <BasicTabs tabsList={tabsList}/>
    </>
  )
}

export default SensorPage