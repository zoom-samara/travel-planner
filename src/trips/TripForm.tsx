import React from 'react'
import { Field, Form, FormikProps } from 'formik'
import { format } from 'date-fns'
import { INewTrip } from '../types/trip'

const TripForm: React.FC<FormikProps<INewTrip>> = ({ isSubmitting, isValid, isValidating, status, values }) => (
  <Form>
    {status && <div>{status}</div>}

    <div>
      <label htmlFor="destination">Destination</label>
      <Field name="destination" required />
    </div>
    <div>
      <label htmlFor="startDate">Start Date</label>
      <Field type="date" name="startDate" min={format(new Date(), 'yyyy-MM-dd')} required />
    </div>
    <div>
      <label htmlFor="endDate">End Date</label>
      <Field
        type="date"
        name="endDate"
        min={values.startDate}
        value={values.startDate > values.endDate && values.endDate ? values.startDate : values.endDate}
        required
      />
    </div>
    <div>
      <label htmlFor="comment">Comment</label>
      <Field name="comment" component="textarea" />
    </div>
    <div>{isValid}</div>
    <div>{isValidating}</div>
    <button type="submit" disabled={isSubmitting}>
      Submit Trip
    </button>
  </Form>
)

export default TripForm
