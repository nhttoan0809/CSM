import { Tabs, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
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
  },
  {
    title: 'Giam sat',
    url: 'monitor',
  }
]

const WarehousePage = () => {

  const navigate = useNavigate()
  const location = useLocation()
  const distpatch = useDispatch()

  useEffect(() => {
    if(location.pathname==='/warehouse'){
      navigate(tabsList[0].url)
    }
  })

  useEffect(() => {
    distpatch(setCurrentTab("warehouse"));
  }, [])

  return (
    <>
        {/* Title */}
        <Typography variant='h3'>Kho</Typography>
        <BasicTabs tabsList={tabsList}/>
    </>
  )
}

export default WarehousePage