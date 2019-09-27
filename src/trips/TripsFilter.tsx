import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPrint } from '@fortawesome/free-solid-svg-icons'

interface IProps {
  onVisibleToggle(isVisible: boolean): void
  onFilter(str: string): void
  defaultFilter: string
  defaultToggle: boolean
}

const TripsFilter: React.FC<IProps> = ({ onFilter, onVisibleToggle, defaultFilter, defaultToggle }) => {
  const [visibility, toggleVisibility] = useState(defaultToggle)
  const [filter, toggleFilter] = useState(defaultFilter)

  useEffect(() => {
    onVisibleToggle(visibility)
  }, [visibility, onVisibleToggle])

  useEffect(() => {
    onFilter(filter)
  }, [filter, onFilter])

  return (
    <section className="filter">
      <h1 className="filter_title">Filter</h1>
      <div className="filter_row">
        <div className="filter_col -input">
          <input
            className="form-control"
            type="text"
            onChange={(e) => toggleFilter(e.target.value)}
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
            checked={visibility}
            onChange={() => toggleVisibility(!visibility)}
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
