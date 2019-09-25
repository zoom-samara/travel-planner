import { handleActions } from 'redux-actions'
import { set } from 'lodash/fp'
import { SET_USER } from './authActions'
import { IUser } from '../types/user'

const DEFAULT_STATE: { user?: IUser } = {
  user: undefined,
}

export default handleActions<typeof DEFAULT_STATE, any>(
  {
    [SET_USER]: (state, { payload: user }: SET_USER) => set('user', user, state),
  },
  DEFAULT_STATE
)
