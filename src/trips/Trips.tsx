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
import { filteredTripsSelector, filterTripsSelector } from './tripsSelector'

const Trips: React.FC = () => {
  const [loading, setLoading] = useState(true)

  const dispatch = useThunkDispatch()
  const user = useSelector(userSelector)
  const list = useSelector(filteredTripsSelector)
  const filter = useSelector(filterTripsSelector)

  useEffect(() => {
    dispatch(getTripsList()).then(() => setLoading(false))
  }, [dispatch])

  return (
    <div className="container">
      <TripsFilter />
      <div className="trips">
        <div className="trips_print-title -next-month" />
        {list.length > 0 ? (
          <ul className="trips_list">
            {list.map((trip: ITrip) => (
              <TripsItem key={trip.id} trip={trip} user={user} showMyTrips={filter.onlyMyTrips} />
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
