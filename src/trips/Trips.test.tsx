import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import { Provider } from 'react-redux'
import store from '../store'
import { ITrip, ITripsFilter } from '../types/trip'
import { IUser } from '../types/user'
import { Trips } from './Trips'

Enzyme.configure({ adapter: new Adapter() })

const defaultFilter: ITripsFilter = { search: '', onlyMyTrips: true }
const defaultTrips: ITrip[] = []

const defaultUser: IUser = { displayName: 'displayName', email: 'email', uid: 'user_id' }

describe('Trips Component', () => {
  it('By Default Should be Empty List', () => {
    const wrapper = Enzyme.shallow(
      <Provider store={store}>
        <Trips filter={defaultFilter} list={defaultTrips} user={defaultUser} />
      </Provider>
    )

    expect(wrapper.render()).toMatchSnapshot()
  })

  it('User have a trip', () => {
    const trips: ITrip[] = [
      {
        destination: 'New York',
        endDate: '321',
        id: '0',
        startDate: '123',
        uid: 'user_id',
      },
    ]
    const wrapper = Enzyme.shallow(
      <Provider store={store}>
        <Trips filter={defaultFilter} list={trips} user={defaultUser} />
      </Provider>
    )

    expect(wrapper.render()).toMatchSnapshot()
  })
})
