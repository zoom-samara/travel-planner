import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { setUser } from '../auth/authActions'
import store from '../store'
import { ITrip, ITripsFilter } from '../types/trip'
import { IUser } from '../types/user'
import Trips from './Trips'
import { setTrips } from './tripsActions'

Enzyme.configure({ adapter: new Adapter() })

const defaultFilter: ITripsFilter = { search: '', onlyMyTrips: true }
const defaultTrips: ITrip[] = []

const defaultUser: IUser = { displayName: 'displayName', email: 'email', uid: 'user_id' }

describe('Trips Component', () => {
  it('By Default Should be Empty List', () => {
    const wrapper = Enzyme.mount(
      <Provider store={store}>
        <BrowserRouter>
          <Trips />
        </BrowserRouter>
      </Provider>
    )

    expect(wrapper.find('.trips-item')).toHaveLength(0)
  })

  it('User have a trip', () => {
    const trips: ITrip[] = [
      {
        destination: 'New York',
        startDate: '2100-01-01',
        endDate: '2100-10-01',
        id: '0',
        uid: 'user_id',
      },
    ]

    store.dispatch(setUser(defaultUser))
    store.dispatch(setTrips(trips))

    const wrapper = Enzyme.mount(
      <Provider store={store}>
        <BrowserRouter>
          <Trips />
        </BrowserRouter>
      </Provider>
    )

    expect(wrapper.find('.trips-item')).toHaveLength(1)
  })
})
