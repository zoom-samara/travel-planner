import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {ReduxDispatch} from "../types/common";
import { requestCurrentUser } from './authActions'

const Meta: React.FC = ({ children }) => {
  const dispatch: ReduxDispatch = useDispatch()

  useEffect(() => {
    dispatch(requestCurrentUser())
  }, [dispatch])

  return <>{children}</>
}

export default Meta
