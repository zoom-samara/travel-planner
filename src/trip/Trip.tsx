import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { useSelector } from 'react-redux'
import { userSelector } from '../auth/authSelector'
import useThunkDispatch from '../common/useThunkDispatch'
import { requestTripDetails } from './tripActions'
import { tripSelector } from './tripSelector'
import EditTrip from './EditTrip'
import Loading from '../components/Loading/Loading'
import { Link } from 'react-router-dom'

interface IRouteParams {
  id: string
}

const Trip: React.FC<RouteComponentProps<IRouteParams>> = ({ match }) => {
  const id = String(match.params.id)
  const [loading, setLoading] = useState(true)
  const user = useSelector(userSelector)
  const trip = useSelector(tripSelector)
  const dispatch = useThunkDispatch()

  useEffect(() => {
    dispatch(requestTripDetails(id)).then(() => setLoading(false))
  }, [dispatch, id])

  if (loading) return <Loading fullPage />

  return (
    <div className="container">
      <div className="trip">
        <div className="trip_title">
          <Link to="/service/trips" className="trip_back">
            &larr; Back to list
          </Link>
          <h1>{trip.destination}</h1>
        </div>
      </div>

      {trip.uid === user.uid && <EditTrip />}

      <div className="trip_content">
        <dl className="trip_field">
          <dt>Start Date:</dt>
          <dd>{new Date(trip.startDate).toLocaleDateString()}</dd>
        </dl>
        <dl className="trip_field">
          <dt>End Date:</dt>
          <dd>{new Date(trip.endDate).toLocaleDateString()}</dd>
        </dl>
        <dl className="trip_field">
          <dt>Comment:</dt>
          <dd>{trip.comment}</dd>
        </dl>
      </div>
    </div>
  )
}

export default Trip
