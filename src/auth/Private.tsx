import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import Loading from '../components/Loading/Loading'
import { authStatusSelector, userSelector } from './authSelector'

interface IPrivateProps {
  isPrivate: boolean
}

const Private: React.FC<IPrivateProps> = ({ children, isPrivate }) => {
  const user = useSelector(userSelector)
  const meta = useSelector(authStatusSelector)

  if (!meta) {
    return <Loading fullPage />
  }

  if (!user && isPrivate) {
    return <Redirect to="/auth/signin" />
  }

  if (user && !isPrivate) {
    return <Redirect to="/service/trips" />
  }

  return <>{children}</>
}

export default Private
