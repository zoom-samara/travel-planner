import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { authStatusSelector, userSelector } from './authSelector'
import { Redirect } from 'react-router'
import Loading from "../components/Loading/Loading";

interface IProps {
  isPrivate: boolean
}

const Private: React.FC<IProps> = ({ children, isPrivate }) => {
  const [loading, setLoading] = useState(true)
  const user = useSelector(userSelector)
  const meta = useSelector(authStatusSelector)

  React.useEffect(() => {
    if (meta) setLoading(false)
  }, [meta])

  if (loading) return <Loading fullPage/>

  if (!user && isPrivate) return <Redirect to="/auth/signin" />
  if (user && !isPrivate) return <Redirect to="/service/trips" />

  return <>{children}</>
}

export default Private
