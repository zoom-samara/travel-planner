import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { userSelector } from '../auth/authSelector'
import createTypedStructuredSelector from '../common/createTypedStructuredSelector'
import useThunkDispatch from "../common/useThunkDispatch";
import Loading from '../components/Loading/Loading'
import { ITrip, ITripsFilter } from '../types/trip'
import { IUser } from '../types/user'
import AddTrip from './AddTrip'
import { getTripsList } from './tripsActions'
import TripsFilter from './TripsFilter'
import TripsItem from './TripsItem'
import { filteredTripsSelector, filterTripsSelector } from './tripsSelector'

interface ISelectedProps {
  filter: ITripsFilter
  list: ITrip[]
  user: IUser
}

const Trips: React.FC<ISelectedProps> = ({ user, list, filter }) => {
  const [loading, setLoading] = useState(true)
  const dispatch = useThunkDispatch()

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

export default connect(
  createTypedStructuredSelector<ISelectedProps>({
    user: userSelector,
    list: filteredTripsSelector,
    filter: filterTripsSelector,
  })
)(Trips)
