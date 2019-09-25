import React from 'react'
import { useSelector } from 'react-redux'
import { userSelector } from './authSelector'
import useThunkDispatch from '../common/useThunkDispatch'
import { requestCurrentUser } from './authActions'
import { Redirect } from 'react-router'

const Private: React.FC = ({ children }) => {
  const user = useSelector(userSelector)
  const dispatch = useThunkDispatch()

  React.useEffect(() => {
    const init = async () => {
      if (!user) dispatch(requestCurrentUser())
    }
    init()
  }, [dispatch, user])

  if (!user) return <Redirect to="/auth/signin" />

  return <>{children}</>
}

export default Private
