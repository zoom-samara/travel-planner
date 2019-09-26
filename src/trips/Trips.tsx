import React, { useEffect, useState } from 'react'
import AddTrip from './AddTrip'
import { useSelector } from 'react-redux'
import { tripsSelector } from './tripsSelector'
import useThunkDispatch from '../common/useThunkDispatch'
import { getTripsList } from './tripsActions'
import { ITrip } from '../types/trip'
import { userSelector } from '../auth/authSelector'
import { Link } from 'react-router-dom'

const Trips: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const dispatch = useThunkDispatch()
  const list = useSelector(tripsSelector)
  const user = useSelector(userSelector)

  useEffect(() => {
    dispatch(getTripsList()).then(() => setLoading(false))
  }, [dispatch])

  return (
    <div>
      <ul>
        {list.map((trip: ITrip, idx) => (
          <li key={trip.id}>
            <Link to={`/service/trip/${trip.id}`}>{trip.destination}</Link>
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
