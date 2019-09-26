import { handleActions } from 'redux-actions'
import { set } from 'lodash/fp'
import { SET_USER, SET_META } from './authActions'
import { IUser } from '../types/user'

const DEFAULT_STATE: { user?: IUser, meta?: boolean } = {
  meta: false,
  user: undefined,
}

export default handleActions<typeof DEFAULT_STATE, any>(
  {
    [SET_META]: (state, { payload: meta }: SET_USER) => set('meta', meta, state),
    [SET_USER]: (state, { payload: user }: SET_USER) => set('user', user, state),
  },
  DEFAULT_STATE
)
