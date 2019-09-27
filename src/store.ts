import { routerMiddleware } from 'connected-react-router'
import * as firebase from 'firebase/app'
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk, { ThunkMiddleware } from 'redux-thunk'

import history from './history'
import rootReducer from './rootReducer'

const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 25 })

const store = createStore(
  rootReducer,
  {},
  composeEnhancers(applyMiddleware(routerMiddleware(history), thunk as ThunkMiddleware))
)

try {
  firebase.initializeApp(require('./firebase_credentials.json')) // tslint:disable-line:no-var-requires
} catch (ex) {
  console.error('INCLUDE firebase_credentials.json in "src" directory') // tslint:disable-line:no-console
  firebase.initializeApp({})
}



if (module.hot) {
  module.hot.accept('./rootReducer', () => {
    const nextRootReducer = require('./rootReducer')
    store.replaceReducer(nextRootReducer)
  })
}

export default store
