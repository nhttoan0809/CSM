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

const PalletPage = () => {

  const navigate = useNavigate()
  const location = useLocation()
  const distpatch = useDispatch()

  useEffect(() => {
    if(location.pathname==='/pallet'){
      navigate(tabsList[0].url)
    }
  })
  
  useEffect(() => {
    distpatch(setCurrentTab("pallet"));
  }, [])

  return (
    <>
        {/* Title */}
        <Typography variant='h3'>Pallet</Typography>
        <BasicTabs tabsList={tabsList}/>
    </>
  )
}

export default PalletPage