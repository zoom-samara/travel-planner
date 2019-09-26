import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import authReducer from './auth/authReducer'
import tripsReducer from './trips/tripsReducer'
import history from './history'
import { CLEAR_STATE } from './auth/authActions'
import { Action } from './types/common'

const reducer = combineReducers({
  router: connectRouter(history),
  auth: authReducer,
  trips: tripsReducer,
})

export default (state: any, action: Action<any>) => reducer(action.type === CLEAR_STATE ? {} : state, action)
