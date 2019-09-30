import { useDispatch } from 'react-redux'
import { ThunkDispatch } from '../types/common'

export default () => useDispatch<ThunkDispatch>()
