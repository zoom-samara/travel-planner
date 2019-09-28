import { faPrint } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useSelector } from 'react-redux'
import useThunkDispatch from '../common/useThunkDispatch'
import { setFilter } from './tripsActions'
import { filterTripsSelector } from './tripsSelector'

const TripsFilter: React.FC = () => {
  const filter = useSelector(filterTripsSelector)
  const dispatch = useThunkDispatch()

  const toggleVisibility = (value: boolean) => {
    dispatch(setFilter({ ...filter, onlyMyTrips: value }))
  }
  const onChangeSearch = (value: string) => {
    dispatch(setFilter({ ...filter, search: value }))
  }

  return (
    <section className="filter">
      <h1 className="filter_title">Filter</h1>
      <div className="filter_row">
        <div className="filter_col -input">
          <input
            className="form-control"
            type="text"
            defaultValue={filter.search}
            onChange={(e) => onChangeSearch(e.target.value)}
            placeholder="Find by Destination"
          />
        </div>
        <div className="filter_sep" />

        <div className="filter_col -visibility">
          <label className="filter_label" htmlFor="toggleVisibility">
            Show only my trips
          </label>

          <input
            id="toggleVisibility"
            type="checkbox"
            className="filter_visibility-input"
            checked={filter.onlyMyTrips}
            onChange={() => toggleVisibility(!filter.onlyMyTrips)}
          />
        </div>

        <div className="filter_sep" />

        <div className="filter_col -print">
          <button className="filter_print" id="printTrips" onClick={() => window.print()}>
            <span className="filter_print-label">Print next month plan</span>
            <FontAwesomeIcon icon={faPrint} />
          </button>
        </div>
      </div>
    </section>
  )
}

export default TripsFilter
