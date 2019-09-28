import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cn from 'classnames'
import React from 'react'

interface ILoadingProps {
  fullPage?: boolean
}

const Loading: React.FC<ILoadingProps> = ({ fullPage }) => (
  <div
    className={cn('loading', {
      '-full-page': fullPage,
    })}
  >
    <FontAwesomeIcon icon={faSpinner} spin />
  </div>
)

export default Loading
