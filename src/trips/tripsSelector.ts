import { compareAsc } from 'date-fns'
import { get } from 'lodash/fp'
import { createSelector } from 'reselect'
import { userSelector } from '../auth/authSelector'
import { Selector } from '../types/common'
import { ITrip, ITripsFilter } from '../types/trip'

export const tripsSelector: Selector<ITrip[]> = get('trips.list')
export const filterTripsSelector: Selector<ITripsFilter> = get('trips.filter')

export const filteredTripsSelector: Selector<ITrip[]> = createSelector(
  tripsSelector,
  filterTripsSelector,
  userSelector,
  (list, filter, user) =>
    list
      .filter((trip) => (filter.onlyMyTrips ? trip.uid === user.uid : true))
      .filter((trip) => trip.destination.toLowerCase().includes(filter.search.toLowerCase()))
      .sort((a, b) => compareAsc(new Date(a.startDate), new Date(b.startDate)))
)
