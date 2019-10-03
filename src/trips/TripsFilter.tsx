import { faPrint } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { memo, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { ITripsFilter } from '../types/trip'
import { setFilter } from './tripsActions'

interface ITripsFilterProps {
  filter: ITripsFilter
}

const TripsFilter: React.FC<ITripsFilterProps> = ({ filter }) => {
  const dispatch = useDispatch()

  const updateFilter = useCallback(
    (values: ITripsFilter) => {
      dispatch(setFilter(values))
    },
    [dispatch]
  )

  return (
    <section className="filter">
      <h1 className="filter_title">Filter</h1>
      <div className="filter_row">
        <div className="filter_col -input">
          <input
            className="form-control"
            type="text"
            defaultValue={filter.search}
            onChange={(e) => updateFilter({ ...filter, search: e.target.value })}
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
            onChange={() => updateFilter({ ...filter, onlyMyTrips: !filter.onlyMyTrips })}
          />
        </div>

        <div className="filter_sep" />

        <div className="filter_col -print">
          <button className="filter_print" id="printTrips" onClick={window.print}>
            <span className="filter_print-label">Print next month plan</span>
            <FontAwesomeIcon icon={faPrint} />
          </button>
        </div>
      </div>
    </section>
  )
}

export default memo(TripsFilter)
