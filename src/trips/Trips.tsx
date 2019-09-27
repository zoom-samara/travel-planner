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
import TripsItem from './TripsItem'

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
        <h1 className="trips_print-title -next-month" />
        <ul className="trips_list">
          {list
            .filter((trip) => (showMyTrips ? trip.uid === user.uid : true))
            .filter((trip) => trip.destination.toLowerCase().includes(filter.toLowerCase()))
            .sort((a, b) => compareAsc(new Date(a.startDate), new Date(b.startDate)))
            .map((trip: ITrip) => (
              <TripsItem trip={trip} user={user} showMyTrips={showMyTrips} />
            ))}
        </ul>
        {loading && <Loading />}
      </div>

      <AddTrip />
    </div>
  )
}

export default Trips
