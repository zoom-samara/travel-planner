import { routerMiddleware } from 'connected-react-router'
import * as firebase from 'firebase/app'
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk, { ThunkMiddleware } from 'redux-thunk'
import firebaseCredentials from './firebase_credentials.json'

import history from './history'
import rootReducer from './rootReducer'

const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 25 })

const store = createStore(
  rootReducer,
  {},
  composeEnhancers(applyMiddleware(routerMiddleware(history), thunk as ThunkMiddleware))
)

firebase.initializeApp(firebaseCredentials)

if (module.hot) {
  module.hot.accept('./rootReducer', () => {
    const nextRootReducer = require('./rootReducer')
    store.replaceReducer(nextRootReducer)
  })
}

export default store
