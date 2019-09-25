import React from 'react'
import { useSelector } from 'react-redux'
import { userSelector } from '../../auth/authSelector'
import { Link } from 'react-router-dom'
import useThunkDispatch from '../../common/useThunkDispatch'
import { requestLogout } from '../../auth/authActions'

const Header: React.FC = () => {
  const user = useSelector(userSelector)
  const dispatch = useThunkDispatch()
  return (
    <header>
      {user ? (
        <div>
          {user.displayName}
          <button onClick={() => dispatch(requestLogout())}>Log out</button>
        </div>
      ) : (
        <div>
          <Link to="/auth/signin">Login Me</Link>
        </div>
      )}
    </header>
  )
}

export default Header
