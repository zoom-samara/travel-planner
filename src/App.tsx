import React from 'react'
import { hot } from 'react-hot-loader/root'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'

import store from './store'
import history from './history'

import Landing from './landing/Landing'
import Signin from './auth/Signin'
import Signup from './auth/Signup'
import Header from './views/header/Header'
import Meta from './auth/Meta'
import Trips from './trips/Trips'
import Auth from './auth/Auth'
import Private from './auth/Private'
import Trip from './trip/Trip'

const p404 = () => <h1>404 page not found</h1>

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Header />
        <Meta>
          <Switch>
            <Route path="/" exact component={Landing} />
            <Route
              path="/auth"
              render={() => (
                <Auth>
                  <Switch>
                    <Route path="/auth/signin" component={Signin} />
                    <Route path="/auth/signup" component={Signup} />
                  </Switch>
                </Auth>
              )}
            />
            <Route
              path="/service"
              render={() => (
                <Private>
                  <Route path="/service/trips" component={Trips} />
                  <Route path="/service/trip/:id" component={Trip} />
                </Private>
              )}
            />
            <Route component={p404} />
          </Switch>
        </Meta>
      </ConnectedRouter>
    </Provider>
  )
}

export default hot(App)
