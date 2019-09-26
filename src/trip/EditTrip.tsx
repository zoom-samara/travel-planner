import React from 'react'
import { useSelector } from 'react-redux'
import { tripSelector } from './tripSelector'
import { Formik } from 'formik'
import { ITrip } from '../types/trip'
import { requestUpdateTrip } from './tripActions'
import useThunkDispatch from '../common/useThunkDispatch'
import TripForm from '../trips/TripForm'

interface IProps {
  id: string
}

const EditTrip: React.FC<IProps> = () => {
  const trip: ITrip = useSelector(tripSelector)
  const dispatch = useThunkDispatch()

  return (
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
  )
}

export default EditTrip
