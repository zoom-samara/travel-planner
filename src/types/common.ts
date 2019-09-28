import { Action as ReduxAction } from 'redux-actions'
import { ThunkAction as ReduxThunkAction, ThunkDispatch } from 'redux-thunk'
import { Selector as ReselectSelector } from 'reselect'

import store from '../store'

export type Store = typeof store

export type Selector<Result> = ReselectSelector<Store | any, Result>

export type Action<Payload> = ReduxAction<Payload>

export type ThunkAction<Return = void> = ReduxThunkAction<Return, Store, undefined, Action<any>>

export type ReduxDispatch = ThunkDispatch<Store, any, Action<any>>;
