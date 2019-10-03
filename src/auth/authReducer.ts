import { set } from 'lodash/fp'
import { handleActions } from 'redux-actions'
import { IUser } from '../types/user'
import { SET_AUTH_UPDATED, SET_USER } from './authActions'

const DEFAULT_STATE: { user?: IUser, updated?: boolean } = {
  updated: false,
  user: undefined,
}

export default handleActions<typeof DEFAULT_STATE, any>(
  {
    [SET_AUTH_UPDATED]: (state, { payload: status }: SET_AUTH_UPDATED) => set('updated', status, state),
    [SET_USER]: (state, { payload: user }: SET_USER) => set('user', user, state),
  },
  DEFAULT_STATE
)
