import * as firebase from 'firebase/app'
import 'firebase/firestore'
import { identity } from 'lodash/fp'
import { createAction } from 'redux-actions'

import history from '../history'
import { Action, ThunkAction } from '../types/common'
import { INewTrip, ITrip } from '../types/trip'

export const SET_TRIP = 'TRIP/SET'
export type SET_TRIP = Action<ITrip>
export const setTrip = createAction<ITrip, ITrip>(SET_TRIP, identity)

export const requestTripDetails = (id: string): ThunkAction<Promise<void>> => (dispatch) =>
  firebase
    .firestore()
    .collection('trips')
    .doc(id)
    .get()
    .then((doc) => {
      dispatch(
        setTrip(({
          id: doc.id,
          exists: doc.exists,
          ...doc.data(),
        } as any) as ITrip)
      )
    })
    .catch((err) => Promise.reject(err))

export const requestUpdateTrip = (id: string, data: INewTrip): ThunkAction<Promise<void>> => (dispatch) =>
  firebase
    .firestore()
    .collection('trips')
    .doc(id)
    .update(data)
    .then(() => dispatch(requestTripDetails(id)))
    .catch((err) => Promise.reject(err))

export const requestRemoveTrip = (id: string): ThunkAction<Promise<void>> => () =>
  firebase
    .firestore()
    .collection('trips')
    .doc(id)
    .delete()
    .then(() => {
      history.push('/service/trips')
    })
    .catch((err) => Promise.reject(err))
