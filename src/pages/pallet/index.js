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

const PalletPage = () => {

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if(location.pathname==='/pallet'){
      navigate(tabsList[0].url)
    }
  })

  return (
    <>
        {/* Title */}
        <Typography variant='h3'>Pallet</Typography>
        <BasicTabs tabsList={tabsList}/>
    </>
  )
}

export default PalletPage