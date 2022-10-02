import { Tabs, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import BasicTabs from '../../components/Tabs'

const tabsList = [
  {
    title: 'Chi tiet',
    url: 'detail',
  },
  {
    title: 'Cau hinh',
    url: 'config',
  },
  {
    title: 'Giam sat',
    url: 'monitor',
  }
]

const WarehousePage = () => {

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if(location.pathname==='/warehouse'){
      navigate(tabsList[0].url)
    }
  })

  return (
    <>
        {/* Title */}
        <Typography variant='h3'>Kho</Typography>
        <BasicTabs tabsList={tabsList}/>
    </>
  )
}

export default WarehousePage