import React, { useEffect, useState } from 'react'

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
    <div>
      <input type="text" onChange={(e) => toggleFilter(e.target.value)} />
      <label htmlFor="toggleVisibility">Show only my trips</label>
      <input type="checkbox" checked={visibility} onChange={() => toggleVisibility(!visibility)} />

      <button onClick={() => window.print()}>Print next month plan</button>
    </div>
  )
}

export default TripsFilter
