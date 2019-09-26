import React from 'react'
import { useSelector } from 'react-redux'
import { tripSelector } from './tripSelector'
import { Formik } from 'formik'
import { ITrip } from '../types/trip'
import { requestRemoveTrip, requestUpdateTrip } from './tripActions'
import useThunkDispatch from '../common/useThunkDispatch'
import TripForm from '../trips/TripForm'

const EditTrip: React.FC = () => {
  const trip: ITrip = useSelector(tripSelector)
  const dispatch = useThunkDispatch()
  const onRemove = () => {
    try {
      dispatch(requestRemoveTrip(trip.id))
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <Formik
        initialValues={{
          destination: trip.destination,
          startDate: trip.startDate,
          endDate: trip.endDate,
          comment: trip.comment,
        }}
        onSubmit={(values, { setSubmitting, setStatus }) => {
          setSubmitting(true)
          dispatch(requestUpdateTrip(trip.id, values))
            .then(() => {
              console.log('form submitted')
            })
            .catch(({ message }) => setStatus(message))
            .finally(() => setSubmitting(false))
        }}
      >
        {TripForm}
      </Formik>
      <button type="button" onClick={() => onRemove()}>
        Remove Trip
      </button>
    </div>
  )
}

export default EditTrip
