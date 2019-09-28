import { set } from 'lodash/fp'
import { handleActions } from 'redux-actions'
import { ITrip, IFilter } from '../types/trip'
import { ADD_TRIP, SET_TRIPS, SET_FILTER } from './tripsActions'

const DEFAULT_STATE: { list: ITrip[]; filter: IFilter } = {
  filter: {
    search: '',
    onlyMyTrips: true,
  },
  list: [],
}

export default handleActions<typeof DEFAULT_STATE, any>(
  {
    [SET_FILTER]: (state, { payload: filter }: SET_FILTER) => set('filter', filter, state),
    [SET_TRIPS]: (state, { payload: trips }: SET_TRIPS) => set('list', trips, state),
    [ADD_TRIP]: (state, { payload: trip }: ADD_TRIP) => set('list', [...state.list, trip], state),
  },
  DEFAULT_STATE
)
