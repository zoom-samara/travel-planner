import { applyMiddleware, createStore } from 'redux'
import thunk, { ThunkMiddleware } from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { routerMiddleware } from 'connected-react-router'
import * as firebase from 'firebase/app'

import rootReducer from './rootReducer'
import history from './history'

const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 25 })

const store = createStore(
  rootReducer,
  {},
  composeEnhancers(applyMiddleware(routerMiddleware(history), thunk as ThunkMiddleware))
)

let firebaseCredentials = {}
try {
  firebaseCredentials = require('./firebase_credentials.json')
} catch (ex) {
  console.error('INCLUDE firebase_credentials.json in "src" directory')
}

firebase.initializeApp(firebaseCredentials)

if (module.hot) {
  module.hot.accept('./rootReducer', () => {
    const nextRootReducer = require('./rootReducer')
    store.replaceReducer(nextRootReducer)
  })
}

export default store
