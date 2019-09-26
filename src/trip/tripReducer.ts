import { handleActions } from 'redux-actions'
import { SET_TRIP } from './tripActions'
import { ITrip } from '../types/trip'

const DEFAULT_STATE: ITrip = {
  id: '',
  uid: '',
  destination: '',
  endDate: '',
  startDate: ''
}

export default handleActions<typeof DEFAULT_STATE, any>(
  {
    [SET_TRIP]: (state, { payload: trip }: SET_TRIP) => trip,
  },
  DEFAULT_STATE
)
