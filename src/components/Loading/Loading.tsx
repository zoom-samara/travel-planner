import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cn from 'classnames'
import React from 'react'

interface IProps {
  fullPage?: boolean
}

const Loading: React.FC<IProps> = ({ fullPage }) => (
  <div
    className={cn('loading', {
      '-full-page': fullPage,
    })}
  >
    <FontAwesomeIcon icon={faSpinner} spin />
  </div>
)

export default Loading
