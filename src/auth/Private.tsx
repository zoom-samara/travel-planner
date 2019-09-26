import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { authStatusSelector, userSelector } from './authSelector'
import { Redirect } from 'react-router'

const Private: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const user = useSelector(userSelector)
  const meta = useSelector(authStatusSelector)

  React.useEffect(() => {
    if (meta) setLoading(false)
  }, [meta])

  if (loading) return <div>Loading Private</div>

  if (!user) return <Redirect to="/auth/signin" />

  return <>{children}</>
}

export default Private
