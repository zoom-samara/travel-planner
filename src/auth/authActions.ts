import { createAction } from 'redux-actions'
import { identity } from 'lodash/fp'
import firebase from 'firebase'

import { Action, ThunkAction } from '../types/common'
import { IUser, IAuthUser } from '../types/user'

import history from '../history'

export const SET_USER = 'AUTH/SET_USER'
export type SET_USER = Action<string>
export const setUser = createAction<IUser, IUser>(SET_USER, identity)

export const CLEAR_STATE = 'CLEAR_STATE'
export type CLEAR_STATE = Action<null>
export const clearState = (): ThunkAction<void> => (dispatch) => {
  dispatch({ type: CLEAR_STATE, payload: null })
  history.push('/auth/signin')
}

export const requestCurrentUser = (): ThunkAction<Promise<void>> => async (dispatch) => {
  const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      dispatch(
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        } as IUser)
      )

      unsubscribe()
    }
  })
}

export const requestLogout = (): ThunkAction<Promise<void>> => async (dispatch) =>
  firebase
    .auth()
    .signOut()
    .then(() => {
      dispatch(clearState())
    })

export const requestSignIn = (user: IAuthUser): ThunkAction<Promise<void>> => async (dispatch) =>
  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then(({ user }) => {
      if (user) {
        dispatch(setUser(user as IUser))
        history.push('/service/dashboard')
      }
    })
    .catch((err) => Promise.reject(err))

export const requestSignUp = (newUser: IAuthUser): ThunkAction<Promise<void>> => async (dispatch: any) =>
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
            history.push('/service/dashboard')
          })
          .catch((err) => Promise.reject(err))
      }
    })
    .catch((err) => Promise.reject(err))
