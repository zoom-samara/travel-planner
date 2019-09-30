import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { userSelector } from '../auth/authSelector'
import Loading from '../components/Loading/Loading'
import { ReduxDispatch, Store } from '../types/common'
import { ITrip, ITripsFilter } from '../types/trip'
import { IUser } from '../types/user'
import AddTrip from './AddTrip'
import { getTripsList } from './tripsActions'
import TripsFilter from './TripsFilter'
import TripsItem from './TripsItem'
import { filteredTripsSelector, filterTripsSelector } from './tripsSelector'

interface ITripsProps {
  filter: ITripsFilter
  list: ITrip[]
  user: IUser
}

const Trips: React.FC<ITripsProps> = ({ user, list, filter }) => {
  const [loading, setLoading] = useState(true)
  const dispatch: ReduxDispatch = useDispatch()

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
  createStructuredSelector<Store, ITripsProps>({
    user: userSelector,
    list: filteredTripsSelector,
    filter: filterTripsSelector,
  })
)(Trips)
