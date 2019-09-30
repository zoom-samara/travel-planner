import * as firebase from 'firebase/app'
import 'firebase/auth'
import { identity } from 'lodash/fp'
import { batch } from 'react-redux'
import { createAction } from 'redux-actions'

import { Action, ThunkAction } from '../types/common'
import { IAuthUser, IUser } from '../types/user'

import history from '../history'

export const SET_USER = 'AUTH/SET_USER'
export type SET_USER = Action<IUser>
export const setUser = createAction<IUser, IUser>(SET_USER, identity)

export const SET_STATUS = 'AUTH/SET_STATUS'
export type SET_STATUS = Action<boolean>
export const setStatusUpdated = createAction<boolean, boolean>(SET_STATUS, identity)

export const CLEAR_STATE = 'CLEAR_STATE'
export type CLEAR_STATE = Action<null>
export const clearState = (): ThunkAction<void> => (dispatch) => {
  dispatch({ type: CLEAR_STATE, payload: null })
  history.push('/auth/signin')
}

export const requestCurrentUser = (): ThunkAction<void> => (dispatch) => {
  const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      dispatch(
        setUser(({
          displayName: user.displayName,
          email: user.email,
          uid: user.uid,
        } as any) as IUser)
      )
    }
    dispatch(setStatusUpdated(true))
    unsubscribe()
  })
}

export const requestLogout = (): ThunkAction<Promise<void>> => (dispatch) =>
  firebase
    .auth()
    .signOut()
    .then(() => {
      batch(() => {
        dispatch(clearState())
        dispatch(setStatusUpdated(true))
      })
    })

export const requestSignIn = (userData: IAuthUser): ThunkAction<Promise<void>> => (dispatch) =>
  firebase
    .auth()
    .signInWithEmailAndPassword(userData.email, userData.password)
    .then(({ user }) => {
      if (user) {
        dispatch(setUser(user as IUser))
        history.push('/service/trips')
      }
    })
    .catch((err) => Promise.reject(err))

export const requestSignUp = (newUser: IAuthUser): ThunkAction<Promise<void>> => (dispatch) =>
  firebase
    .auth()
    .createUserWithEmailAndPassword(newUser.email, newUser.password)
    .then(({ user }) => {
      if (user) {
        user
          .updateProfile({
            displayName: newUser.displayName,
          })
          .then(() => {
            dispatch(setUser(user as IUser))
            history.push('/service/trips')
          })
          .catch((err) => Promise.reject(err))
      }
    })
    .catch((err) => Promise.reject(err))
