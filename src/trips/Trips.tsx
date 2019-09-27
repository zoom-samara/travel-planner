import { compareAsc } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { userSelector } from '../auth/authSelector'
import useThunkDispatch from '../common/useThunkDispatch'
import Loading from '../components/Loading/Loading'
import { ITrip } from '../types/trip'
import AddTrip from './AddTrip'
import { getTripsList } from './tripsActions'
import TripsFilter from './TripsFilter'
import TripsItem from './TripsItem'
import { tripsSelector } from './tripsSelector'

const Trips: React.FC = () => {
  const [showMyTrips, toggleMyTrips] = useState(true)
  const [filter, setFilter] = useState('')
  const [loading, setLoading] = useState(true)

  const dispatch = useThunkDispatch()
  const user = useSelector(userSelector)
  const list = useSelector(tripsSelector)
    .filter((trip) => (showMyTrips ? trip.uid === user.uid : true))
    .filter((trip) => trip.destination.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => compareAsc(new Date(a.startDate), new Date(b.startDate)))

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
        <div className="trips_print-title -next-month" />
        {list.length > 0 ? (
          <ul className="trips_list">
            {list.map((trip: ITrip) => (
              <TripsItem key={trip.id} trip={trip} user={user} showMyTrips={showMyTrips} />
            ))}
          </ul>
        ) : (
          !loading && (
            <div className="trips_empty alert alert-info">
              You do not have trips. You can add your first trip below.
            </div>
          )
        )}
        {loading && <Loading />}
      </div>

      <AddTrip />
    </div>
  )
}

export default Trips
