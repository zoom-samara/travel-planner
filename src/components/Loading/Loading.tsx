import React from 'react'
import cn from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

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
