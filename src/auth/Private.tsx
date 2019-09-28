import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { createStructuredSelector } from 'reselect'
import Loading from '../components/Loading/Loading'
import { IUser } from '../types/user'
import { authStatusSelector, userSelector } from './authSelector'

interface IPrivateProps {
  isPrivate: boolean
  user: IUser
  meta: boolean
}

const Private: React.FC<IPrivateProps> = ({ children, isPrivate, user, meta }) => {
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

export default connect(
  createStructuredSelector({
    user: userSelector,
    meta: authStatusSelector,
  })
)(Private)
