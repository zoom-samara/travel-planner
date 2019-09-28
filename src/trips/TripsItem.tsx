import { faCalendarAlt, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cn from 'classnames'
import { addMonths, differenceInDays, isAfter, isBefore } from 'date-fns'
import React from 'react'
import { Link } from 'react-router-dom'
import { ITrip } from '../types/trip'
import { IUser } from '../types/user'

interface ITripsItemProps {
  trip: ITrip
  user: IUser
  showMyTrips?: boolean
}

const TripsItem: React.FC<ITripsItemProps> = ({ trip, user, showMyTrips }) => (
  <li
    className={cn('trips-item', {
      '-next-month':
        isAfter(new Date(trip.startDate), new Date()) && isBefore(new Date(trip.startDate), addMonths(new Date(), 1)),
      '-prev': isBefore(new Date(trip.startDate), new Date()),
    })}
  >
    <div className="trips-item_title-row">
      {!showMyTrips && (
        <div className="trips-item_user-row">
          <FontAwesomeIcon className="trips-item_user-icon" icon={faUser} />
          {trip.uid === user.uid ? user.displayName : 'Anonymous'}
        </div>
      )}

      <div className="trips-item_date-row">
        <FontAwesomeIcon className="trips-item_date-icon" icon={faCalendarAlt} />
        <div className="trips-item_date">{trip.startDate}</div>
        {isAfter(new Date(trip.startDate), new Date()) && (
          <div className="trips-item_start">
            Days before start: <b>{differenceInDays(new Date(trip.startDate), new Date())}</b>
          </div>
        )}
      </div>
    </div>

    <Link className="trips-item_link" to={`/service/trip/${trip.id}`}>
      {trip.destination}
    </Link>
  </li>
)

export default TripsItem
