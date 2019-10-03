import { Formik } from 'formik'
import React, { useCallback, useState } from 'react'
import { connect } from 'react-redux'
import createTypedStructuredSelector from '../common/createTypedStructuredSelector'
import useThunkDispatch from '../common/useThunkDispatch'
import TripForm from '../trips/TripForm'
import { ITrip } from '../types/trip'
import { requestRemoveTrip, requestUpdateTrip } from './tripActions'
import { tripSelector } from './tripSelector'

interface ISelectedProps {
  trip: ITrip
}
const EditTrip: React.FC<ISelectedProps> = ({ trip }) => {
  const [isEdit, toggleEdit] = useState(false)
  const dispatch = useThunkDispatch()

  const onRemove = useCallback(async () => {
    window.confirm('Do you really want to remove the trip?')

    try {
      await dispatch(requestRemoveTrip(trip.id))
    } catch (err) {
      window.alert(err)
    }
  }, [trip, dispatch])

  const onToggleEdit = useCallback(() => {
    toggleEdit(!isEdit)
  }, [isEdit])

  const onSubmit = useCallback(
    (values, { setSubmitting, setStatus }) => {
      setSubmitting(true)
      dispatch(requestUpdateTrip(trip.id, values))
        .then(() => {
          toggleEdit(false)
        })
        .catch(({ message }: { message: string }) => setStatus(message))
        .finally(() => setSubmitting(false))
    },
    [dispatch, trip]
  )

  return (
    <div className="edit-trip">
      <div className="edit-trip_buttons">
        <button type="button" className="edit-trip_control -edit" onClick={onToggleEdit}>
          Edit Trip
        </button>

        <button type="button" className="edit-trip_control -remove" onClick={onRemove}>
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
            onSubmit={onSubmit}
          >
            {TripForm}
          </Formik>
        </div>
      )}
    </div>
  )
}

export default connect(
  createTypedStructuredSelector<ISelectedProps>({
    trip: tripSelector,
  })
)(EditTrip)
