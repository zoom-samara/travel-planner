import { get } from 'lodash/fp'
import { Selector } from '../types/common'
import { IUser } from '../types/user'

export const userSelector: Selector<IUser> = get('auth.user')
export const authStatusSelector: Selector<IUser> = get('auth.updated')
