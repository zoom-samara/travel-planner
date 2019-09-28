import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { requestCurrentUser } from './authActions'

const Meta: React.FC = ({ children }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(requestCurrentUser())
  }, [dispatch])

  return <>{children}</>
}

export default Meta
