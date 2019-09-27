import { handleActions } from 'redux-actions'
import { ITrip } from '../types/trip'
import { SET_TRIP } from './tripActions'

const DEFAULT_STATE: ITrip = {
  destination: '',
  endDate: '',
  id: '',
  startDate: '',
  uid: '',
}

export default handleActions<typeof DEFAULT_STATE, any>(
  {
    [SET_TRIP]: (state, { payload: trip }: SET_TRIP) => trip,
  },
  DEFAULT_STATE
)
