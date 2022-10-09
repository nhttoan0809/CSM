import React, { useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const Authentication = () => {

    const [user, setUser] = useLocalStorage("acessToken-CSM", null)

    useEffect(() => {
        
    }, [])

  return (
    <></>
  )
}

export default Authentication