import React from 'react'
import { useSelector } from 'react-redux'
import { tripSelector } from './tripSelector'
import { Formik, Form, Field } from 'formik'
import { ITrip } from '../types/trip'
import { requestUpdateTrip } from './tripActions'
import useThunkDispatch from '../common/useThunkDispatch'

interface IProps {
  id: string
}

const EditTrip: React.FC<IProps> = () => {
  const trip: ITrip = useSelector(tripSelector)
  const dispatch = useThunkDispatch()

  return (
    <Formik
      initialValues={
        {
          destination: trip.destination,
          startDate: trip.startDate,
          endDate: trip.endDate,
          comment: trip.comment,
        } as ITrip
      }
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
      {({ isSubmitting, isValid, isValidating, status }) => (
        <Form>
          {status && <div>{status}</div>}

          <div>
            <label htmlFor="destination">Destination</label>
            <Field name="destination" />
          </div>
          <div>
            <label htmlFor="startDate">Start Date</label>
            <Field type="date" name="startDate" />
          </div>
          <div>
            <label htmlFor="endDate">Start Date</label>
            <Field type="date" name="endDate" />
          </div>
          <div>
            <label htmlFor="comment">Comment</label>
            <Field name="comment" component="textarea" />
          </div>
          <div>{isValid}</div>
          <div>{isValidating}</div>
          <button type="submit" disabled={isSubmitting}>
            Update Trip
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default EditTrip
