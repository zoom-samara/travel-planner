import React, { useEffect, useState } from 'react'
import useThunkDispatch from '../common/useThunkDispatch'
import { requestCurrentUser } from './authActions'

const Meta: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const dispatch = useThunkDispatch()

  useEffect(() => {
    dispatch(requestCurrentUser()).then(() => {
      setLoading(false)
    })
  }, [dispatch])

  return (
    <>
      {loading && <div>loading...</div>}
      {children}
    </>
  )
}

export default Meta
