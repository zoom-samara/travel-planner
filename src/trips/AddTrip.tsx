import { Formik } from 'formik'
import React, { useCallback } from 'react'
import useThunkDispatch from '../common/useThunkDispatch'
import TripForm from './TripForm'
import { requestCreateTrip } from './tripsActions'

const AddTrip: React.FC = () => {
  const dispatch = useThunkDispatch()

  const onSubmit = useCallback(
    (values, { setSubmitting, setStatus, resetForm }) => {
      setSubmitting(true)

      dispatch(requestCreateTrip(values))
        .then(() => resetForm())
        .catch(({ message }: { message: string }) => setStatus(message))
        .finally(() => setSubmitting(false))
    },
    [dispatch]
  )

  return (
    <section className="add-trip">
      <h1 className="add-trip_title">Add new Trip</h1>
      <div className="add-trip_form">
        <Formik initialValues={{ destination: '', startDate: '', endDate: '', comment: '' }} onSubmit={onSubmit}>
          {TripForm}
        </Formik>
      </div>
    </section>
  )
}

export default AddTrip
