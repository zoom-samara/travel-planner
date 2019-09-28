import { Formik } from 'formik'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import useThunkDispatch from '../common/useThunkDispatch'
import TripForm from '../trips/TripForm'
import { ITrip } from '../types/trip'
import { requestRemoveTrip, requestUpdateTrip } from './tripActions'
import { tripSelector } from './tripSelector'

interface IEditTripProps {
  trip: ITrip
}
const EditTrip: React.FC<IEditTripProps> = ({ trip }) => {
  const [isEdit, onToggleEdit] = useState(false)
  const dispatch = useThunkDispatch()
  const onRemove = async () => {
    try {
      await dispatch(requestRemoveTrip(trip.id))
    } catch (err) {
      window.alert(err)
    }
  }

  return (
    <div className="edit-trip">
      <div className="edit-trip_buttons">
        <button type="button" className="edit-trip_control -edit" onClick={() => onToggleEdit(!isEdit)}>
          Edit Trip
        </button>

        <button
          type="button"
          className="edit-trip_control -remove"
          onClick={() => window.confirm('Do you really want to remove the trip?') && onRemove()}
        >
          Remove Trip
        </button>
      </div>

      {isEdit && (
        <div className="edit-trip_form">
          <h2 className="edit-trip_title">Edit Trip</h2>
          <Formik
            initialValues={{
              comment: trip.comment,
              destination: trip.destination,
              endDate: trip.endDate,
              startDate: trip.startDate,
            }}
            onSubmit={(values, { setSubmitting, setStatus }) => {
              setSubmitting(true)
              dispatch(requestUpdateTrip(trip.id, values))
                .then(() => {
                  onToggleEdit(false)
                })
                .catch(({ message }) => setStatus(message))
                .finally(() => setSubmitting(false))
            }}
          >
            {TripForm}
          </Formik>
        </div>
      )}
    </div>
  )
}

export default connect(
  createStructuredSelector({
    trip: tripSelector,
  })
)(EditTrip)
