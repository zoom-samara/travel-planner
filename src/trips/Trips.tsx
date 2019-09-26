import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { compareAsc, isAfter, differenceInDays, addMonths, isBefore } from 'date-fns'
import { tripsSelector } from './tripsSelector'
import useThunkDispatch from '../common/useThunkDispatch'
import { getTripsList } from './tripsActions'
import { ITrip } from '../types/trip'
import { userSelector } from '../auth/authSelector'
import TripsFilter from './TripsFilter'
import AddTrip from './AddTrip'

const Trips: React.FC = () => {
  const [showMyTrips, toggleMyTrips] = useState(true)
  const [filter, setFilter] = useState('')
  const [loading, setLoading] = useState(true)
  const dispatch = useThunkDispatch()
  const list = useSelector(tripsSelector)
  const user = useSelector(userSelector)

  useEffect(() => {
    dispatch(getTripsList()).then(() => setLoading(false))
  }, [dispatch])

  return (
    <div>
      <TripsFilter
        onVisibleToggle={toggleMyTrips}
        onFilter={setFilter}
        defaultFilter={filter}
        defaultToggle={showMyTrips}
      />
      <ul>
        {list
          .filter((trip) => (showMyTrips ? trip.uid === user.uid : true))
          .filter((trip) => trip.destination.toLowerCase().includes(filter.toLowerCase()))
          .sort((a, b) => compareAsc(new Date(a.startDate), new Date(b.startDate)))
          .map((trip: ITrip) => (
            <li
              key={trip.id}
              className={cn('item', {
                '-next-month':
                  isAfter(new Date(trip.startDate), new Date()) &&
                  isBefore(new Date(trip.startDate), addMonths(new Date(), 1)),
              })}
            >
              <Link to={`/service/trip/${trip.id}`}>
                {trip.startDate}
                {trip.destination}
              </Link>

              {isAfter(new Date(trip.startDate), new Date()) && (
                <div>Days before start: {differenceInDays(new Date(trip.startDate), new Date())}</div>
              )}
              {trip.uid === user.uid && <span> | your</span>}
            </li>
          ))}
      </ul>
      {loading && <div>Loading...</div>}
      <AddTrip />
    </div>
  )
}

export default Trips
