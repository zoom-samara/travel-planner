import React, { useEffect } from 'react'
import useThunkDispatch from '../common/useThunkDispatch'
import { requestCurrentUser } from './authActions'

const Meta: React.FC = ({ children }) => {
  const dispatch = useThunkDispatch()

  useEffect(() => {
    dispatch(requestCurrentUser())
  }, [dispatch])

  return <>{children}</>
}

export default Meta
