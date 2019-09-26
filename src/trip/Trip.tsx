import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { useSelector } from 'react-redux'
import { userSelector } from '../auth/authSelector'
import useThunkDispatch from '../common/useThunkDispatch'
import { requestTripDetails } from './tripActions'
import { tripSelector } from './tripSelector'
import EditTrip from './EditTrip'

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
    dispatch(requestTripDetails(id)).finally(() => setLoading(false))
  }, [dispatch, id])

  if (loading) return <div>Loading</div>

  return (
    <div>
      <h1>{trip.destination}</h1>
      {trip.uid === user.uid && <EditTrip id={id} />}
      {new Date(trip.startDate).toLocaleDateString()}
      {new Date(trip.endDate).toLocaleDateString()}
      {trip.comment}
    </div>
  )
}

export default Trip
