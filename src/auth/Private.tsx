import React, { useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { metaSelector, userSelector } from './authSelector'
import { Redirect } from 'react-router'

const Private: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const user = useSelector(userSelector)
  const meta = useSelector(metaSelector)
  const didMountRef = useRef(false)

  React.useEffect(() => {
    if (didMountRef.current || user) {
      setLoading(false)
    } else {
      didMountRef.current = true
    }
  }, [user, meta])

  if (loading) return <div>Loading Private</div>

  if (!user) return <Redirect to="/auth/signin" />

  return <>{children}</>
}

export default Private
