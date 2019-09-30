import { ConnectedRouter } from 'connected-react-router'
import React from 'react'
import { hot } from 'react-hot-loader/root'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import history from './history'
import store from './store'

import Meta from './auth/Meta'
import Private from './auth/Private'
import Signin from './auth/Signin'
import Signup from './auth/Signup'
import Landing from './landing/Landing'
import Trip from './trip/Trip'
import Trips from './trips/Trips'
import Header from './views/header/Header'

const P404: React.FC = () => (
  <div className="container">
    <h1>404 page not found</h1>
  </div>
)

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div className="page">
          <Header />
          <Meta>
            <Switch>
              <Route path="/" exact component={Landing} />
              <Route
                path="/auth"
                render={() => (
                  <Private isPrivate={false}>
                    <Switch>
                      <Route path="/auth/signin" component={Signin} />
                      <Route path="/auth/signup" component={Signup} />
                    </Switch>
                  </Private>
                )}
              />
              <Route
                path="/service"
                render={() => (
                  <Private isPrivate={true}>
                    <Route path="/service/trips" component={Trips} />
                    <Route path="/service/trip/:id" component={Trip} />
                  </Private>
                )}
              />
              <Route component={P404} />
            </Switch>
          </Meta>
        </div>
      </ConnectedRouter>
    </Provider>
  )
}

export default hot(App)
