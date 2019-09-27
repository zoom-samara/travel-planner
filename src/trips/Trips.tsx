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
import Loading from '../components/Loading/Loading'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt, faUser } from '@fortawesome/free-solid-svg-icons'

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
    <div className="container">
      <TripsFilter
        onVisibleToggle={toggleMyTrips}
        onFilter={setFilter}
        defaultFilter={filter}
        defaultToggle={showMyTrips}
      />
      <div className="trips">
        <ul className="trips_list">
          {list
            .filter((trip) => (showMyTrips ? trip.uid === user.uid : true))
            .filter((trip) => trip.destination.toLowerCase().includes(filter.toLowerCase()))
            .sort((a, b) => compareAsc(new Date(a.startDate), new Date(b.startDate)))
            .map((trip: ITrip) => (
              <li
                key={trip.id}
                className={cn('trips_item', {
                  '-prev': isBefore(new Date(trip.startDate), new Date()),
                  '-next-month':
                    isAfter(new Date(trip.startDate), new Date()) &&
                    isBefore(new Date(trip.startDate), addMonths(new Date(), 1)),
                })}
              >
                <div className="trips_title-row">
                  {!showMyTrips && (
                    <div className="trips_user-row">
                      <FontAwesomeIcon className="trips_user-icon" icon={faUser} />
                      {trip.uid === user.uid ? user.displayName : 'Anonymous'}
                    </div>
                  )}

                  <div className="trips_date-row">
                    <FontAwesomeIcon className="trips_date-icon" icon={faCalendarAlt} />
                    <div className="trips_date">{trip.startDate}</div>
                    {isAfter(new Date(trip.startDate), new Date()) && (
                      <div className="trips_start">
                        Days before start: <b>{differenceInDays(new Date(trip.startDate), new Date())}</b>
                      </div>
                    )}
                  </div>
                </div>

                <Link className="trips_link" to={`/service/trip/${trip.id}`}>
                  {trip.destination}
                </Link>
              </li>
            ))}
        </ul>
        {loading && <Loading />}
      </div>

      <AddTrip />
    </div>
  )
}

export default Trips
