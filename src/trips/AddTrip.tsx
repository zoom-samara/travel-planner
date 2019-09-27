import React from 'react'
import { Formik } from 'formik'
import useThunkDispatch from '../common/useThunkDispatch'
import { requestCreateTrip } from './tripsActions'

import TripForm from './TripForm'

const AddTrip: React.FC = () => {
  const dispatch = useThunkDispatch()

  return (
    <section className="add-trip">
      <h1 className="add-trip_title">Add new Trip</h1>
      <div className="add-trip_form">
        <Formik
          initialValues={{ destination: '', startDate: '', endDate: '', comment: '' }}
          onSubmit={(values, { setSubmitting, setStatus, resetForm }) => {
            setSubmitting(true)

            dispatch(requestCreateTrip(values))
              .then(() => resetForm())
              .catch(({ message }) => setStatus(message))
              .finally(() => setSubmitting(false))
          }}
        >
          {TripForm}
        </Formik>
      </div>
    </section>
  )
}

export default AddTrip
