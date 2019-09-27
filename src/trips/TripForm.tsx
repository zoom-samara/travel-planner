import { format } from 'date-fns'
import { Field, Form, FormikProps } from 'formik'
import React from 'react'
import { INewTrip } from '../types/trip'

const TripForm: React.FC<FormikProps<INewTrip>> = ({ isSubmitting, isValid, isValidating, status, values }) => (
  <Form>
    {status && <div className="form_error">{status}</div>}

    <div className="row">
      <div className="col-sm-6">
        <div className="form-group">
          <label htmlFor="destination">
            Destination <abbr title="Required">*</abbr>
          </label>
          <Field className="form-control" name="destination" required />
        </div>
        <div className="row">
          <div className="col-sm-6">
            <div className="form-group">
              <label htmlFor="startDate">
                Start Date <abbr title="Required">*</abbr>
              </label>
              <Field
                className="form-control"
                type="date"
                name="startDate"
                min1={format(new Date(), 'yyyy-MM-dd')}
                required
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <label htmlFor="endDate">
                End Date <abbr title="Required">*</abbr>
              </label>
              <Field
                className="form-control"
                type="date"
                name="endDate"
                min={values.startDate}
                value={values.startDate > values.endDate && values.endDate ? values.startDate : values.endDate}
                required
              />
            </div>
          </div>
        </div>
      </div>
      <div className="col-sm-6">
        <div className="form-group">
          <label htmlFor="comment">Comment</label>
          <Field className="form-control" name="comment" component="textarea" rows={4} />
        </div>
      </div>
    </div>

    <div className="form_controls">
      <button className="form_submit" type="submit" disabled={isSubmitting}>
        Submit Trip
      </button>
    </div>
  </Form>
)

export default TripForm
