import React from 'react'
import { Formik, Form, Field } from 'formik'
import useThunkDispatch from '../common/useThunkDispatch'
import { requestCreateTrip } from './tripsActions'

const AddTrip: React.FC = () => {
  const dispatch = useThunkDispatch()

  return (
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
            Add Trip
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default AddTrip
