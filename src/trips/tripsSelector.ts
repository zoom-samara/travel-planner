import { get } from 'lodash/fp'
import { Selector } from '../types/common'
import { ITrip } from '../types/trip'

export const tripsSelector: Selector<ITrip[]> = get('trips.list')
