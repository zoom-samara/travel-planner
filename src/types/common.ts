import { Selector as ReselectSelector, ParametricSelector as ReselectParametricSelector } from 'reselect'
import { Action as ReduxAction } from 'redux-actions'
import { ThunkAction as ReduxThunkAction } from 'redux-thunk'

import store from '../store'

export type Store = typeof store

export type Selector<Result> = ReselectSelector<Store, Result>

export type Action<Payload> = ReduxAction<Payload>

export type ThunkAction<Return = void> = ReduxThunkAction<Return, any, undefined, Action<any>>
