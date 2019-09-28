import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { identity } from 'lodash/fp'
import { createAction } from 'redux-actions'

import { Action, ThunkAction } from '../types/common'
import { INewTrip, ITrip } from '../types/trip'

export const ADD_TRIP = 'TRIPS/ADD_TRIP'
export type ADD_TRIP = Action<ITrip>
export const addTrip = createAction<ITrip, ITrip>(ADD_TRIP, identity)

export const SET_TRIPS = 'TRIPS/SET_TRIPS'
export type SET_TRIPS = Action<ITrip[]>
export const setTrips = createAction<ITrip[], ITrip[]>(SET_TRIPS, identity)

export const requestCreateTrip = (trip: INewTrip): ThunkAction<Promise<void>> => async (dispatch) =>
  firebase
    .firestore()
    .collection('trips')
    .add({
      ...trip,
      uid: firebase.auth().currentUser!.uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then((docRef) => {
      firebase
        .firestore()
        .collection('trips')
        .doc(docRef.id)
        .get()
        .then((doc) => {
          dispatch(
            addTrip({
              id: doc.id,
              ...doc.data(),
            } as ITrip)
          )
        })
    })
    .catch((err) => Promise.reject(err))

export const getTripsList = (): ThunkAction<Promise<void>> => async (dispatch) =>
  firebase
    .firestore()
    .collection('trips')
    .get()
    .then((querySnapshot) => {
      let tripsList: ITrip[] = []
      querySnapshot.forEach((doc) => {
        tripsList = [
          ...tripsList,
          {
            id: doc.id,
            ...doc.data(),
          } as ITrip,
        ]
      })

      dispatch(setTrips(tripsList))
    })
