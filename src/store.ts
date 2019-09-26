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

firebase.initializeApp({
  apiKey: 'AIzaSyDKXE2SuNfvQBcKSiwdMWoW98PnsxGGmwU',
  authDomain: 'travel-planner-49309.firebaseapp.com',
  databaseURL: 'https://travel-planner-49309.firebaseio.com',
  projectId: 'travel-planner-49309',
  storageBucket: 'travel-planner-49309.appspot.com',
  messagingSenderId: '440891735435',
  appId: '1:440891735435:web:b1c114f0104f1f3642c38e',
})

if (module.hot) {
  module.hot.accept('./rootReducer', () => {
    const nextRootReducer = require('./rootReducer')
    store.replaceReducer(nextRootReducer)
  })
}

export default store
