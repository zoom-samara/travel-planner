import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import {metaSelector, userSelector} from './authSelector'
import { Redirect } from 'react-router'

const Auth: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const user = useSelector(userSelector)
  const meta = useSelector(metaSelector)
  const didMountRef = useRef(false)

  React.useEffect(() => {
    if (didMountRef.current || !user) {
      setLoading(false)
    } else {
      didMountRef.current = true
    }
  }, [user, meta])

  if (loading) return <div>Loading Auth</div>

  if (user) return <Redirect to="/service/trips" />

  return <>{children}</>
}

export default Auth
