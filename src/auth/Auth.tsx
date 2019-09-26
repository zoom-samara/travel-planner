import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import {authStatusSelector, userSelector} from './authSelector'
import { Redirect } from 'react-router'

const Auth: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const user = useSelector(userSelector)
  const meta = useSelector(authStatusSelector)

  React.useEffect(() => {
    if (meta) setLoading(false)
  }, [meta])

  if (loading) return <div>Loading Auth</div>

  if (user) return <Redirect to="/service/trips" />

  return <>{children}</>
}

export default Auth
