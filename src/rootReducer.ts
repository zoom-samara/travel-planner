import { connectRouter } from 'connected-react-router'
import { combineReducers } from 'redux'

import { CLEAR_STATE } from './auth/authActions'
import authReducer from './auth/authReducer'
import history from './history'
import tripReducer from './trip/tripReducer'
import tripsReducer from './trips/tripsReducer'
import { Action } from './types/common'

const reducer = combineReducers({
  auth: authReducer,
  router: connectRouter(history),
  trip: tripReducer,
  trips: tripsReducer,
})

export default (state: any, action: Action<any>) => reducer(action.type === CLEAR_STATE ? {} : state, action)
